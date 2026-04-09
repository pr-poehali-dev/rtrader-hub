UPDATE t_p67093308_rtrader_hub.admin_users 
SET password_hash = encode(sha256(('RTrader11_4Ever')::bytea), 'hex')
WHERE username = 'RTrader11';