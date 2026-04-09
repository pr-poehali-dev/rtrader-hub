INSERT INTO t_p67093308_rtrader_hub.admin_users (username, password_hash)
VALUES ('RTrader11', encode(sha256(('RTrader2024!')::bytea), 'hex'))
ON CONFLICT (username) DO UPDATE SET password_hash = encode(sha256(('RTrader2024!')::bytea), 'hex');