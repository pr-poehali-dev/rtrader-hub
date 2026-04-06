
-- Добавляем поле position во все контентные таблицы
ALTER TABLE t_p67093308_rtrader_hub.analytics ADD COLUMN IF NOT EXISTS position INT NOT NULL DEFAULT 0;
ALTER TABLE t_p67093308_rtrader_hub.education ADD COLUMN IF NOT EXISTS position INT NOT NULL DEFAULT 0;
ALTER TABLE t_p67093308_rtrader_hub.tournaments ADD COLUMN IF NOT EXISTS position INT NOT NULL DEFAULT 0;
ALTER TABLE t_p67093308_rtrader_hub.reflections ADD COLUMN IF NOT EXISTS position INT NOT NULL DEFAULT 0;
ALTER TABLE t_p67093308_rtrader_hub.reviews ADD COLUMN IF NOT EXISTS position INT NOT NULL DEFAULT 0;

-- Таблица для сообщений из Telegram чатов
CREATE TABLE IF NOT EXISTS t_p67093308_rtrader_hub.telegram_messages (
  id SERIAL PRIMARY KEY,
  chat_id BIGINT NOT NULL,
  chat_title TEXT,
  message_id BIGINT NOT NULL,
  username TEXT,
  full_name TEXT,
  text TEXT,
  sent_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(chat_id, message_id)
);

CREATE INDEX IF NOT EXISTS idx_telegram_messages_chat_id ON t_p67093308_rtrader_hub.telegram_messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_telegram_messages_sent_at ON t_p67093308_rtrader_hub.telegram_messages(sent_at DESC);
