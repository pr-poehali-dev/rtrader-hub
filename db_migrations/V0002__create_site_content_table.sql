CREATE TABLE IF NOT EXISTS t_p67093308_rtrader_hub.site_content (
    id SERIAL PRIMARY KEY,
    section VARCHAR(50) NOT NULL,
    key VARCHAR(100) NOT NULL,
    value TEXT NOT NULL,
    label VARCHAR(200) DEFAULT '',
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(section, key)
);

INSERT INTO t_p67093308_rtrader_hub.site_content (section, key, value, label) VALUES
('home', 'hero_title', 'RTrader — трейдинговый супер‑портал', 'Главная: заголовок Hero'),
('home', 'hero_subtitle', 'Для того, кто хочет понимать рынок, расти в трейдинге, принимать осознанные решения и зарабатывать без иллюзий «лёгких денег».', 'Главная: подзаголовок Hero'),
('home', 'stats_members', '2 500+', 'Главная: статистика — участников'),
('home', 'stats_years', '7 лет', 'Главная: статистика — на рынке'),
('home', 'stats_materials', '200+', 'Главная: статистика — материалов'),
('community', 'title', 'Комьюнити трейдеров', 'Комьюнити: заголовок'),
('community', 'description', 'Живые обсуждения рынка, обмен идеями и опытом. Чаты по инструментам, еженедельные онлайн-встречи и взаимная поддержка трейдеров всех уровней.', 'Комьюнити: описание'),
('analytics', 'title', 'Аналитика и торговые идеи', 'Аналитика: заголовок'),
('analytics', 'subtitle', 'Еженедельные обзоры рынков, уровни, сценарии — без воды', 'Аналитика: подзаголовок'),
('vip', 'title', 'VIP-клуб RTrader', 'VIP: заголовок'),
('vip', 'description', 'Эксклюзивный доступ к закрытым торговым сигналам, разборам портфеля в реальном времени и прямым консультациям с автором.', 'VIP: описание'),
('education', 'title', 'Обучение и база знаний', 'Обучение: заголовок'),
('education', 'subtitle', 'Структурированный путь от основ до профессиональной торговли', 'Обучение: подзаголовок')
ON CONFLICT (section, key) DO NOTHING;