import json
import os
import psycopg2
from datetime import datetime, timezone


def handler(event: dict, context) -> dict:
    """Принимает webhook от Telegram и сохраняет сообщения в БД."""
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "headers": cors_headers, "body": "Method Not Allowed"}

    body = json.loads(event.get("body") or "{}")
    message = body.get("message") or body.get("channel_post")

    if not message:
        return {"statusCode": 200, "headers": cors_headers, "body": json.dumps({"ok": True})}

    chat = message.get("chat", {})
    chat_id = chat.get("id")
    chat_title = chat.get("title") or chat.get("username") or str(chat_id)
    message_id = message.get("message_id")
    text = message.get("text") or message.get("caption")

    if not text:
        return {"statusCode": 200, "headers": cors_headers, "body": json.dumps({"ok": True})}

    from_user = message.get("from") or {}
    username = from_user.get("username") or chat.get("username")
    first_name = from_user.get("first_name") or ""
    last_name = from_user.get("last_name") or ""
    full_name = (first_name + " " + last_name).strip() or username or "Unknown"

    date_ts = message.get("date")
    sent_at = datetime.fromtimestamp(date_ts, tz=timezone.utc) if date_ts else datetime.now(tz=timezone.utc)

    schema = os.environ["MAIN_DB_SCHEMA"]
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    try:
        with conn:
            with conn.cursor() as cur:
                cur.execute(
                    f"""
                    INSERT INTO {schema}.telegram_messages
                        (chat_id, chat_title, message_id, username, full_name, text, sent_at)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                    ON CONFLICT (chat_id, message_id) DO NOTHING
                    """,
                    (chat_id, chat_title, message_id, username, full_name, text, sent_at),
                )
    finally:
        conn.close()

    return {"statusCode": 200, "headers": cors_headers, "body": json.dumps({"ok": True})}
