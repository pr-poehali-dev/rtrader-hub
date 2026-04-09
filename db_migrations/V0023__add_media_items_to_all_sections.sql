ALTER TABLE t_p67093308_rtrader_hub.analytics ADD COLUMN IF NOT EXISTS media_items JSONB DEFAULT '[]';
ALTER TABLE t_p67093308_rtrader_hub.education ADD COLUMN IF NOT EXISTS media_items JSONB DEFAULT '[]';
ALTER TABLE t_p67093308_rtrader_hub.reflections ADD COLUMN IF NOT EXISTS media_items JSONB DEFAULT '[]';
ALTER TABLE t_p67093308_rtrader_hub.tournaments ADD COLUMN IF NOT EXISTS media_items JSONB DEFAULT '[]';
ALTER TABLE t_p67093308_rtrader_hub.reviews ADD COLUMN IF NOT EXISTS media_items JSONB DEFAULT '[]';
