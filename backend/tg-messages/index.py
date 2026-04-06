import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Возвращает последние сообщения из Telegram чатов для отображения на сайте."""
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    params = event.get("queryStringParameters") or {}
    chat_id = params.get("chat_id")
    limit = min(int(params.get("limit", 50)), 200)

    schema = os.environ["MAIN_DB_SCHEMA"]
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    try:
        with conn.cursor() as cur:
            if chat_id:
                cur.execute(
                    f"""
                    SELECT chat_id, chat_title, message_id, username, full_name, text, sent_at
                    FROM {schema}.telegram_messages
                    WHERE chat_id = %s
                    ORDER BY sent_at DESC
                    LIMIT %s
                    """,
                    (int(chat_id), limit),
                )
            else:
                cur.execute(
                    f"""
                    SELECT chat_id, chat_title, message_id, username, full_name, text, sent_at
                    FROM {schema}.telegram_messages
                    ORDER BY sent_at DESC
                    LIMIT %s
                    """,
                    (limit,),
                )

            rows = cur.fetchall()
            cols = ["chat_id", "chat_title", "message_id", "username", "full_name", "text", "sent_at"]
            messages = [dict(zip(cols, row)) for row in rows]
            for m in messages:
                if m["sent_at"]:
                    m["sent_at"] = m["sent_at"].isoformat() + "Z"
                m["chat_id"] = str(m["chat_id"])
                m["message_id"] = str(m["message_id"])

            cur.execute(
                f"""
                SELECT DISTINCT chat_id, chat_title
                FROM {schema}.telegram_messages
                ORDER BY chat_title
                """
            )
            chats = [{"chat_id": str(r[0]), "chat_title": r[1]} for r in cur.fetchall()]

    finally:
        conn.close()

    return {
        "statusCode": 200,
        "headers": {**cors_headers, "Content-Type": "application/json"},
        "body": json.dumps({"messages": messages, "chats": chats}),
    }
