-- CTA-блок внизу страницы «Рефлексии» — редактируется через CMS
ALTER TABLE t_p67093308_rtrader_hub.author
    ADD COLUMN IF NOT EXISTS reflections_cta_eyebrow TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS reflections_cta_title   TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS reflections_cta_text    TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS reflections_cta_btn     TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS reflections_cta_url     TEXT DEFAULT '';

-- Заполняем текущими значениями в существующей строке
UPDATE t_p67093308_rtrader_hub.author
SET
    reflections_cta_eyebrow = 'Больше материалов',
    reflections_cta_title   = 'Подпишись на Telegram',
    reflections_cta_text    = 'Новые статьи о психологии и дисциплине — в Telegram-канале RTrader.',
    reflections_cta_btn     = 'Перейти в Telegram',
    reflections_cta_url     = 'https://t.me/RTrader11'
WHERE id = (SELECT id FROM t_p67093308_rtrader_hub.author LIMIT 1);