ALTER TABLE t_p67093308_rtrader_hub.admin_sessions
    ALTER COLUMN expires_at SET DEFAULT (NOW() + INTERVAL '10 years');