"""
Котировки в реальном времени через Finnhub API.
GET / — возвращает список котировок для бегущей строки и мини-дашборда.
Кеш 30 секунд — не превышаем лимит Finnhub (60 req/min).
"""
import json
import os
import time
import urllib.request

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

# Инструменты: (символ Finnhub, отображаемое имя, тип)
# Finnhub: акции US через NASDAQ/NYSE, крипта через BINANCE
# Для российских акций используем moex-данные через альтернативный эндпоинт
SYMBOLS = [
    # Крипта (доступна бесплатно на Finnhub)
    {"symbol": "BINANCE:BTCUSDT",  "name": "BTC/USD",  "type": "crypto"},
    {"symbol": "BINANCE:ETHUSDT",  "name": "ETH/USD",  "type": "crypto"},
    # Фьючерсы/ETF как прокси на сырьё (доступны на Finnhub free tier)
    {"symbol": "OANDA:XAUUSD",    "name": "XAU/USD",  "type": "forex"},
    {"symbol": "OANDA:XAGUSD",    "name": "XAG/USD",  "type": "forex"},
    {"symbol": "OANDA:USOIL",     "name": "BRENT",    "type": "forex"},
    {"symbol": "OANDA:NGAS",      "name": "NG",       "type": "forex"},
]

_cache: dict = {"data": None, "ts": 0}
CACHE_TTL = 30  # секунд


def fetch_quote(symbol: str, api_key: str) -> dict | None:
    url = f"https://finnhub.io/api/v1/quote?symbol={symbol}&token={api_key}"
    try:
        with urllib.request.urlopen(url, timeout=5) as r:
            data = json.loads(r.read())
        if not data.get("c"):
            return None
        c = data["c"]   # current
        pc = data["pc"]  # previous close
        change_pct = ((c - pc) / pc * 100) if pc else 0
        return {
            "price": c,
            "change_pct": round(change_pct, 2),
            "up": change_pct >= 0,
        }
    except Exception:
        return None


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    api_key = os.environ.get("FINNHUB_API_KEY", "")
    if not api_key:
        return {
            "statusCode": 503,
            "headers": {**CORS, "Content-Type": "application/json"},
            "body": json.dumps({"error": "FINNHUB_API_KEY не настроен"}),
        }

    now = time.time()
    if _cache["data"] and now - _cache["ts"] < CACHE_TTL:
        return {
            "statusCode": 200,
            "headers": {**CORS, "Content-Type": "application/json"},
            "body": json.dumps(_cache["data"], ensure_ascii=False),
        }

    results = []
    for s in SYMBOLS:
        q = fetch_quote(s["symbol"], api_key)
        if q:
            price = q["price"]
            if price >= 1000:
                price_str = f"{price:,.0f}".replace(",", " ")
            elif price >= 1:
                price_str = f"{price:.2f}"
            else:
                price_str = f"{price:.4f}"

            sign = "+" if q["up"] else ""
            results.append({
                "name": s["name"],
                "price": price_str,
                "change": f"{sign}{q['change_pct']}%",
                "up": q["up"],
                "raw_price": price,
                "raw_change_pct": q["change_pct"],
            })

    payload = {"quotes": results, "updated_at": int(now)}
    _cache["data"] = payload
    _cache["ts"] = now

    return {
        "statusCode": 200,
        "headers": {**CORS, "Content-Type": "application/json"},
        "body": json.dumps(payload, ensure_ascii=False),
    }
