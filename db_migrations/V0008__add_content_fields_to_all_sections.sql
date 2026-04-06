-- Analytics: добавляем тип (signal/review), теги, полный текст, видео
ALTER TABLE t_p67093308_rtrader_hub.analytics
    ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'signal',
    ADD COLUMN IF NOT EXISTS body TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS tags TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS video_url TEXT DEFAULT '';

-- Education: полный текст, видео, теги
ALTER TABLE t_p67093308_rtrader_hub.education
    ADD COLUMN IF NOT EXISTS body TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS video_url TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS tags TEXT DEFAULT '';

-- Tournaments: полный текст, видео, теги
ALTER TABLE t_p67093308_rtrader_hub.tournaments
    ADD COLUMN IF NOT EXISTS body TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS video_url TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS tags TEXT DEFAULT '';