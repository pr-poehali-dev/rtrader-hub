"""
Проверка пароля для входа в admin-зону.
POST / — { "password": "..." } → { "ok": true } или 401
"""

import json
import os

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "headers": CORS_HEADERS, "body": json.dumps({"error": "Method not allowed"})}

    body = json.loads(event.get("body") or "{}")
    password = (body.get("password") or "").strip()

    admin_password = os.environ.get("ADMIN_PASSWORD", "")

    if not admin_password:
        return {
            "statusCode": 500,
            "headers": {**CORS_HEADERS, "Content-Type": "application/json"},
            "body": json.dumps({"error": "Пароль не настроен. Добавьте секрет ADMIN_PASSWORD."}),
        }

    if password == admin_password:
        return {
            "statusCode": 200,
            "headers": {**CORS_HEADERS, "Content-Type": "application/json"},
            "body": json.dumps({"ok": True}),
        }

    return {
        "statusCode": 401,
        "headers": {**CORS_HEADERS, "Content-Type": "application/json"},
        "body": json.dumps({"error": "Неверный пароль"}),
    }
