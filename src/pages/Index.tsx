import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "@/components/ui/icon";

const VIP_URL = "https://web-app-hosting--preview.poehali.dev/login";
const TG_URL = "https://t.me/RTrader11";

const NAV_ITEMS = [
  { label: "Комьюнити", href: "#community" },
  { label: "Аналитика", href: "#analytics" },
  { label: "Рефлексии", href: "#reflexions" },
  { label: "Конкурсы", href: "#contests" },
  { label: "VIP-клуб", href: "#vip" },
  { label: "Обучение", href: "#education" },
  { label: "Об авторе", href: "#author" },
  { label: "FAQ", href: "#faq" },
];

const TICKER_ITEMS = [
  { name: "SBER", price: "318.45", change: "+1.2%", up: true },
  { name: "GAZP", price: "172.80", change: "-0.4%", up: false },
  { name: "LKOH", price: "7 240", change: "+0.8%", up: true },
  { name: "NVTK", price: "1 045", change: "+2.1%", up: true },
  { name: "GMKN", price: "143 600", change: "-1.1%", up: false },
  { name: "ROSN", price: "511.4", change: "+0.3%", up: true },
  { name: "Si-6.25", price: "85 320", change: "+0.6%", up: true },
  { name: "RI-6.25", price: "112 450", change: "+1.4%", up: true },
  { name: "BR-5.25", price: "74.85", change: "-0.9%", up: false },
  { name: "GOLD-6.25", price: "9 815", change: "+1.7%", up: true },
  { name: "NG-5.25", price: "2.84", change: "+3.2%", up: true },
  { name: "WHEAT-5.25", price: "582", change: "-0.5%", up: false },
];

const STATS = [
  { val: "2 500+", label: "трейдеров в сообществе" },
  { val: "7 лет", label: "на рынке" },
  { val: "200+", label: "материалов и разборов" },
  { val: "МосБиржа", label: "основная площадка" },
];

const SECTIONS = [
  {
    id: "community",
    href: "#community",
    icon: "Users",
    title: "Комьюнити трейдеров",
    short: "Чаты, обсуждения, обмен опытом и поддержка",
    description:
      "Живые обсуждения рынка, обмен идеями и опытом. Чаты по инструментам, еженедельные онлайн-встречи и взаимная поддержка трейдеров всех уровней.",
    bullets: [
      "Чат по акциям и фьючерсам 24/5",
      "Тематические каналы по инструментам",
      "Еженедельные созвоны и разборы",
      "Поддержка и обмен опытом",
    ],
    cta: "Подробнее о комьюнити",
    accent: "#00E5FF",
    glow: "rgba(0,229,255,0.25)",
    grad: "from-[#00E5FF] to-[#4169FF]",
  },
  {
    id: "analytics",
    href: "#analytics",
    icon: "TrendingUp",
    title: "Аналитика и торговые идеи",
    short: "Обзоры рынков, уровни, сценарии, идеи с рисками",
    description:
      "Еженедельные торговые идеи и технический анализ ключевых активов Мосбиржи. Уровни, сценарии и торговые условия с указанием рисков — без воды.",
    bullets: [
      "Торговые идеи по акциям РФ",
      "Анализ сырьевых и металлических фьючерсов",
      "Глобальный рынок и геополитика",
      "Условия входа, цели, риски",
    ],
    cta: "Смотреть аналитику",
    accent: "#FFD700",
    glow: "rgba(255,200,0,0.25)",
    grad: "from-[#FFD700] to-[#FF8C00]",
  },
  {
    id: "reflexions",
    href: "#reflexions",
    icon: "Brain",
    title: "Рефлексии трейдера",
    short: "Психология, дисциплина, работа с убытками",
    description:
      "Глубокие статьи о психологии торговли, дисциплине и работе с эмоциями. Потому что успех в трейдинге на 80% — это работа над собой.",
    bullets: [
      "Работа с эмоциями в убыточных сделках",
      "Как выработать торговую дисциплину",
      "Психология решений под давлением",
      "Дневник трейдера: зачем и как вести",
    ],
    cta: "Ко всем рефлексиям",
    accent: "#9B30FF",
    glow: "rgba(155,48,255,0.3)",
    grad: "from-[#9B30FF] to-[#FF2D78]",
  },
  {
    id: "contests",
    href: "#contests",
    icon: "Trophy",
    title: "Конкурсы и турниры",
    short: "Виртуальная торговля, рейтинг, призы",
    description:
      "Соревнования на виртуальных счетах — проверь стратегии без риска. Турнирная таблица в реальном времени, недельные и месячные чемпионаты.",
    bullets: [
      "Виртуальный счёт для соревнований",
      "Live-турнирная таблица",
      "Недельные и месячные чемпионаты",
      "Разборы стратегий победителей",
    ],
    cta: "Смотреть турниры",
    accent: "#FF8C00",
    glow: "rgba(255,140,0,0.3)",
    grad: "from-[#FF8C00] to-[#FF2D78]",
  },
  {
    id: "vip",
    href: VIP_URL,
    icon: "Crown",
    title: "VIP-клуб RTrader",
    short: "Закрытое комьюнити, сигналы, разборы портфеля",
    description:
      "Эксклюзивный доступ к закрытым торговым сигналам, разборам портфеля в реальном времени и прямым консультациям с автором.",
    bullets: [
      "Закрытое комьюнити трейдеров",
      "Регулярная аналитика и сигналы",
      "Структурированные разборы сделок",
      "Прямой доступ к автору и поддержка",
    ],
    cta: "Войти в VIP-клуб",
    accent: "#FF2D78",
    glow: "rgba(255,45,120,0.35)",
    grad: "from-[#FF2D78] to-[#9B30FF]",
    isVip: true,
  },
  {
    id: "education",
    href: "#education",
    icon: "BookOpen",
    title: "Обучение и база знаний",
    short: "Структурированный курс от основ до стратегий",
    description:
      "Структурированный курс от базовых принципов рынка до продвинутых стратегий торговли. Видеоуроки, разборы сделок, тесты.",
    bullets: [
      "Основы теханализа и фундаментала",
      "Торговля фьючерсами на сырьё и металлы",
      "Психология и риск-менеджмент",
      "Разборы реальных сделок",
    ],
    cta: "Перейти к обучению",
    accent: "#4169FF",
    glow: "rgba(65,105,255,0.3)",
    grad: "from-[#4169FF] to-[#9B30FF]",
  },
];

const REVIEWS_TEXT = [
  {
    name: "Алексей М.",
    status: "VIP-клуб",
    badge: "vip",
    text: "Торгую фьючерсами уже год после обучения здесь. Самое ценное — живые разборы сделок и честный взгляд на риски. Без воды и пустых обещаний. Автор объясняет не «как стать миллионером», а как не потерять то, что есть.",
  },
  {
    name: "Дмитрий К.",
    status: "Участник комьюнити",
    badge: "community",
    text: "Нашёл RTrader когда уже слил депозит дважды. Рефлексии трейдера — это отдельная история: читал как книгу про себя. Понял, что проблема была не в стратегии, а в психологии. Рекомендую всем новичкам.",
  },
  {
    name: "Марина С.",
    status: "VIP-клуб",
    badge: "vip",
    text: "Подписалась на VIP скептически. Оказалось — реально работающие сигналы с объяснением логики. Теперь не просто копирую, а понимаю, почему именно эта точка входа. Это меняет всё.",
  },
  {
    name: "Павел Н.",
    status: "Участник комьюнити",
    badge: "community",
    text: "Комьюнити живое и полезное. Обсуждаем сделки в реальном времени, помогаем друг другу разбирать ошибки. Нет токсичности, нет хайпа. Просто трейдеры, которые хотят расти.",
  },
  {
    name: "Виктор О.",
    status: "VIP-клуб",
    badge: "vip",
    text: "Участвовал в первом турнире — занял 3-е место. Честная оценка стратегий, без подтасовок. А главное — разбор итогов от автора. Такого не найти больше нигде бесплатно.",
  },
  {
    name: "Татьяна Р.",
    status: "Участник комьюнити",
    badge: "community",
    text: "Аналитика по нефти и золоту — просто находка. Раньше ориентировалась только на новости, теперь понимаю теханализ. Уровни, которые публикуются, реально работают на графике.",
  },
];

const REVIEWS_SCREENSHOTS = [
  { id: 1, placeholder: true, label: "Отзыв из чата #1" },
  { id: 2, placeholder: true, label: "Отзыв из чата #2" },
  { id: 3, placeholder: true, label: "Отзыв из чата #3" },
];

const ECOSYSTEM = [
  { name: "Telegram", icon: "Send", url: TG_URL, color: "#00E5FF" },
  { name: "Dzen", icon: "Newspaper", url: "https://dzen.ru", color: "#FF8C00" },
  { name: "VK", icon: "Users", url: "https://vk.com", color: "#4169FF" },
  { name: "RuTube", icon: "Play", url: "https://rutube.ru", color: "#FF2D78" },
];

const FAQ_ITEMS = [
  {
    q: "Для кого RTrader?",
    a: "Для начинающих и опытных трейдеров, торгующих на Мосбирже: акции, фьючерсы на сырьё, металлы, продовольствие. Подойдёт тем, кто хочет систематизировать подход и найти сообщество единомышленников.",
  },
  {
    q: "Чем VIP-клуб отличается от бесплатного контента?",
    a: "В VIP-клубе — закрытые торговые сигналы в реальном времени, разборы портфеля автора, приватные стратегии и прямой доступ к консультациям. Бесплатный контент — это аналитика, статьи и материалы по психологии.",
  },
  {
    q: "Как участвовать в конкурсах?",
    a: "Регистрируешься, получаешь виртуальный счёт и торгуешь. Результаты отображаются в реальном времени в общей турнирной таблице. Без реальных денег — только стратегия и мастерство.",
  },
  {
    q: "Какие рынки покрывает RTrader?",
    a: "Фокус — Московская биржа: акции РФ, фьючерсы на нефть, газ, золото, металлы, зерновые. Также следим за глобальным рынком и геополитикой.",
  },
  {
    q: "Где найти все материалы RTrader?",
    a: "Всё основное живёт здесь, на rtrader11.ru. Telegram-канал дублирует публикации. Dzen, VK и RuTube — часть экосистемы, там появляется дополнительный контент.",
  },
];

function ReviewsSection() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="reviews">
      <Reveal>
        <div className="glass-card p-8 md:p-10">
          <div className="text-xs text-white/25 uppercase tracking-widest font-semibold mb-2">Что говорят участники</div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <h2 className="font-russo text-2xl md:text-3xl text-white">Отзывы</h2>
            <p className="text-white/35 text-sm font-light max-w-sm">
              Реальные отклики участников комьюнити и VIP-клуба
            </p>
          </div>

          {/* Текстовые отзывы */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-10">
            {REVIEWS_TEXT.map((r, i) => (
              <div key={i} className="review-card p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full brand-gradient-bg flex items-center justify-center text-black font-russo text-xs font-black">
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white/85">{r.name}</div>
                      <div className="text-xs text-white/35">{r.status}</div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${r.badge === "vip" ? "bg-[#FF2D78]/15 text-[#FF2D78] border border-[#FF2D78]/30" : "bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/25"}`}>
                    {r.badge === "vip" ? "VIP" : "Комьюнити"}
                  </span>
                </div>
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, s) => (
                    <Icon key={s} name="Star" size={12} style={{ color: "#FFD700", fill: "#FFD700" }} />
                  ))}
                </div>
                <p className="text-white/55 text-sm leading-relaxed font-light flex-1">{r.text}</p>
              </div>
            ))}
          </div>

          {/* Скриншоты из Telegram */}
          <div className="border-t border-white/8 pt-8">
            <div className="text-xs text-white/25 uppercase tracking-widest font-semibold mb-4">Скриншоты из чата</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {REVIEWS_SCREENSHOTS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setLightbox(s.id)}
                  className="screenshot-card group relative overflow-hidden rounded-xl aspect-[4/3] flex items-center justify-center"
                >
                  {/* Placeholder — заменить на реальный img src */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#9B30FF]/8 to-[#00E5FF]/8" />
                  <div className="relative z-10 flex flex-col items-center gap-3 text-white/30 group-hover:text-white/60 transition-colors">
                    <Icon name="MessageSquare" size={32} />
                    <span className="text-xs font-semibold">{s.label}</span>
                    <span className="text-xs opacity-60">Нажмите для просмотра</span>
                  </div>
                  <div className="absolute inset-0 border border-[#9B30FF]/20 group-hover:border-[#9B30FF]/50 rounded-xl transition-colors" />
                </button>
              ))}
            </div>
            <p className="text-white/20 text-xs mt-3 font-light">
              * Для добавления реальных скриншотов — замените placeholder-блоки на <code className="text-white/35">&lt;img&gt;</code> с нужными URL
            </p>
          </div>
        </div>
      </Reveal>

      {/* Лайтбокс */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="glass-card p-8 max-w-lg w-full text-center" onClick={(e) => e.stopPropagation()}>
            <div className="text-white/40 text-sm mb-4">Скриншот #{lightbox}</div>
            <div className="aspect-[4/3] bg-gradient-to-br from-[#9B30FF]/10 to-[#00E5FF]/10 rounded-xl flex items-center justify-center mb-4">
              <div className="flex flex-col items-center gap-3 text-white/30">
                <Icon name="MessageSquare" size={48} />
                <span className="text-sm">Место для скриншота из чата</span>
              </div>
            </div>
            <button onClick={() => setLightbox(null)}
              className="neon-btn-outline text-sm px-6 py-2">
              Закрыть
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function useIntersection(ref: React.RefObject<Element>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref as React.RefObject<Element>);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Sparkline({ color, up }: { color: string; up: boolean }) {
  const points = up
    ? "0,20 10,16 20,18 30,12 40,14 50,8 60,10 70,6 80,8 90,4 100,2"
    : "0,2 10,6 20,4 30,8 40,6 50,12 60,10 70,14 80,12 90,16 100,18";
  const id = `g${color.replace("#", "")}`;
  return (
    <svg viewBox="0 0 100 22" className="w-16 h-5" preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,22 ${points} 100,22`} fill={`url(#${id})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MiniDashboard() {
  return (
    <div className="hidden lg:flex flex-col gap-3 w-72 xl:w-80 flex-shrink-0">
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs text-white/40 uppercase tracking-widest font-semibold">RI-6.25</div>
            <div className="font-russo text-white text-xl">112 450</div>
          </div>
          <span className="text-green-400 text-sm font-bold">+1.4%</span>
        </div>
        <div className="w-full h-14">
          <svg viewBox="0 0 200 48" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9B30FF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#9B30FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon
              points="0,48 0,36 20,28 40,32 60,20 80,24 100,14 120,16 140,8 160,10 180,4 200,6 200,48"
              fill="url(#chartGrad)"
            />
            <polyline
              points="0,36 20,28 40,32 60,20 80,24 100,14 120,16 140,8 160,10 180,4 200,6"
              fill="none" stroke="#9B30FF" strokeWidth="1.5" strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-white/25">Индекс РТС</span>
          <span className="text-xs text-white/25">сегодня</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Комьюнити", val: "2.5K", icon: "Users", color: "#00E5FF" },
          { label: "Аналитика", val: "47", icon: "TrendingUp", color: "#FFD700" },
          { label: "Турниры", val: "12", icon: "Trophy", color: "#FF8C00" },
        ].map((item) => (
          <div key={item.label} className="glass-card p-3 flex flex-col gap-1.5">
            <Icon name={item.icon} size={14} style={{ color: item.color }} />
            <div className="font-russo text-white text-base leading-none">{item.val}</div>
            <div className="text-white/30 text-xs">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="glass-card p-3 space-y-2">
        {TICKER_ITEMS.slice(0, 4).map((t) => (
          <div key={t.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-russo text-white/60 w-20">{t.name}</span>
              <Sparkline color={t.up ? "#4ade80" : "#f87171"} up={t.up} />
            </div>
            <span className={`text-xs font-bold ${t.up ? "text-green-400" : "text-red-400"}`}>{t.change}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionCarousel() {
  const [active, setActive] = useState(1);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoplayActive = useRef(false);
  const userActionCooldown = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardW = 280;
  const gap = 16;

  const scrollTo = useCallback((idx: number) => {
    setActive(idx);
    const container = containerRef.current;
    if (!container) return;
    const offset = idx * (cardW + gap) - container.clientWidth / 2 + cardW / 2;
    container.scrollTo({ left: Math.max(0, offset), behavior: "smooth" });
  }, []);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) return;
    autoplayRef.current = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % SECTIONS.length;
        const container = containerRef.current;
        if (container) {
          const offset = next * (cardW + gap) - container.clientWidth / 2 + cardW / 2;
          container.scrollTo({ left: Math.max(0, offset), behavior: "smooth" });
        }
        return next;
      });
    }, 3500);
  }, []);

  const onWrapperEnter = () => {
    autoplayActive.current = true;
    if (hoveredCard === null && !isDragging.current) startAutoplay();
  };

  const onWrapperLeave = () => {
    autoplayActive.current = false;
    stopAutoplay();
  };

  const onCardEnter = (i: number) => {
    setHoveredCard(i);
    stopAutoplay();
  };

  const onCardLeave = () => {
    setHoveredCard(null);
    if (autoplayActive.current && !isDragging.current) startAutoplay();
  };

  const triggerUserAction = () => {
    stopAutoplay();
    if (userActionCooldown.current) clearTimeout(userActionCooldown.current);
    userActionCooldown.current = setTimeout(() => {
      if (autoplayActive.current) startAutoplay();
    }, 2000);
  };

  const prev = () => {
    triggerUserAction();
    scrollTo(Math.max(0, active - 1));
  };
  const next = () => {
    triggerUserAction();
    scrollTo(Math.min(SECTIONS.length - 1, active + 1));
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    startX.current = e.pageX;
    scrollStart.current = e.currentTarget.scrollLeft;
    stopAutoplay();
  };
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    e.currentTarget.scrollLeft = scrollStart.current - (e.pageX - startX.current);
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (userActionCooldown.current) clearTimeout(userActionCooldown.current);
    userActionCooldown.current = setTimeout(() => {
      if (autoplayActive.current && hoveredCard === null) startAutoplay();
    }, 2000);
  };

  useEffect(() => {
    return () => {
      stopAutoplay();
      if (userActionCooldown.current) clearTimeout(userActionCooldown.current);
    };
  }, [stopAutoplay]);

  const navigateTo = (section: (typeof SECTIONS)[0]) => {
    if (section.isVip) {
      window.open(section.href, "_blank");
    } else {
      const el = document.querySelector(section.href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div ref={wrapperRef} className="relative" onMouseEnter={onWrapperEnter} onMouseLeave={onWrapperLeave}>
      <div
        ref={containerRef}
        className="overflow-x-auto scrollbar-hide pb-4 cursor-grab active:cursor-grabbing"
        style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div className="flex gap-4 px-4 md:px-0" style={{ width: "max-content" }}>
          {SECTIONS.map((s, i) => {
            const isActive = i === active;
            const isHovered = i === hoveredCard;
            return (
              <div
                key={s.id}
                onClick={() => { triggerUserAction(); setActive(i); }}
                onMouseEnter={() => onCardEnter(i)}
                onMouseLeave={onCardLeave}
                className="carousel-card flex-shrink-0 flex flex-col gap-4 p-6 cursor-pointer select-none"
                style={{
                  width: cardW,
                  transform: isHovered
                    ? "scale(1.06) perspective(800px) rotateY(-4deg) translateY(-4px)"
                    : isActive
                      ? "scale(1.04) perspective(800px) rotateY(-3deg)"
                      : "scale(1) perspective(800px) rotateY(0deg)",
                  transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s ease, border-color 0.35s ease",
                  borderColor: isActive || isHovered ? s.accent : "rgba(255,255,255,0.08)",
                  boxShadow: isActive || isHovered
                    ? `0 0 30px ${s.glow}, 0 8px 40px rgba(0,0,0,0.4)`
                    : "0 4px 20px rgba(0,0,0,0.3)",
                }}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${s.grad}`}
                  style={{ boxShadow: `0 0 16px ${s.glow}` }}
                >
                  <Icon name={s.icon} size={18} className="text-white" />
                </div>
                <div>
                  <div className="font-russo text-white text-base leading-tight mb-1">{s.title}</div>
                  <div className="text-xs text-white/45 leading-relaxed">{s.short}</div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateTo(s); }}
                  className="mt-auto text-xs font-semibold flex items-center gap-1.5 hover:gap-3 transition-all duration-200"
                  style={{ color: s.accent }}
                >
                  {s.cta} <Icon name="ArrowRight" size={12} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-5">
        <button onClick={prev} disabled={active === 0}
          className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all">
          <Icon name="ChevronLeft" size={16} />
        </button>
        <div className="flex gap-2 items-center">
          {SECTIONS.map((_, i) => (
            <button key={i} onClick={() => { triggerUserAction(); scrollTo(i); }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? 18 : 6,
                height: 6,
                background: i === active ? SECTIONS[active].accent : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
        <button onClick={next} disabled={active === SECTIONS.length - 1}
          className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all">
          <Icon name="ChevronRight" size={16} />
        </button>
      </div>
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const tickerDouble = [...TICKER_ITEMS, ...TICKER_ITEMS];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="neon-grid-bg min-h-screen text-white font-montserrat">

      {/* NAV */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/70 backdrop-blur-xl border-b border-white/10" : "bg-transparent"}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navTo("#hero")} className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg brand-gradient-bg flex items-center justify-center shadow-lg">
              <span className="font-russo text-black text-sm font-black">RT</span>
            </div>
            <span className="font-russo text-xl tracking-wider">R<span className="brand-gradient">TRADER</span></span>
          </button>

          <div className="hidden xl:flex items-center gap-5">
            {NAV_ITEMS.map((item) => (
              <button key={item.href} onClick={() => navTo(item.href)} className="nav-link">{item.label}</button>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-3">
            <a href={TG_URL} target="_blank" rel="noopener noreferrer"
              className="neon-btn-outline text-xs px-3 py-2 flex items-center gap-1.5">
              <Icon name="Send" size={13} /> Telegram
            </a>
            <a href={VIP_URL} target="_blank" rel="noopener noreferrer"
              className="neon-btn text-xs px-4 py-2 flex items-center gap-1.5">
              <Icon name="Crown" size={13} /> VIP-клуб
            </a>
          </div>

          <button className="xl:hidden p-2 text-white/70 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="xl:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 px-4 py-6">
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <button key={item.href} onClick={() => navTo(item.href)}
                  className="text-left nav-link text-base py-2 border-b border-white/5">{item.label}</button>
              ))}
              <div className="flex gap-3 pt-4">
                <a href={TG_URL} target="_blank" rel="noopener noreferrer" className="neon-btn-outline flex-1 text-center text-sm py-2">Telegram</a>
                <a href={VIP_URL} target="_blank" rel="noopener noreferrer" className="neon-btn flex-1 text-center text-sm py-2">VIP-клуб</a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24">
        {/* Moscow skyline — большой, смещён вправо, не мешает тексту */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            viewBox="0 0 1000 700"
            preserveAspectRatio="xMaxYMax meet"
            className="absolute bottom-0 right-0 h-[85%] w-auto"
            style={{ opacity: 0.28 }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="svgGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="svgGlowStrong" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <linearGradient id="skyFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06051a" stopOpacity="0"/>
                <stop offset="85%" stopColor="#06051a" stopOpacity="0"/>
                <stop offset="100%" stopColor="#06051a" stopOpacity="0.7"/>
              </linearGradient>
            </defs>

            {/* ======= ПОКРОВСКИЙ СОБОР (Василий Блаженный) — главный акцент, центр ======= */}
            <g filter="url(#svgGlowStrong)">
              {/* Основание / платформа */}
              <rect x="320" y="530" width="340" height="170" fill="#00E5FF" fillOpacity="0.06" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.5"/>

              {/* Центральная высокая башня */}
              <rect x="450" y="350" width="80" height="185" fill="#00E5FF" fillOpacity="0.08" stroke="#00E5FF" strokeWidth="2" strokeOpacity="0.8"/>
              {/* Центральный луковичный купол — большой */}
              <ellipse cx="490" cy="310" rx="50" ry="65" fill="#00E5FF" fillOpacity="0.1" stroke="#00E5FF" strokeWidth="2.5" strokeOpacity="0.9"/>
              {/* Рёбра купола */}
              <path d="M490,245 Q510,270 490,310 Q470,270 490,245" fill="none" stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.5"/>
              <path d="M490,245 Q518,280 500,318" fill="none" stroke="#00E5FF" strokeWidth="0.8" strokeOpacity="0.35"/>
              <path d="M490,245 Q462,280 480,318" fill="none" stroke="#00E5FF" strokeWidth="0.8" strokeOpacity="0.35"/>
              {/* Шпиль и крест */}
              <line x1="490" y1="245" x2="490" y2="195" stroke="#00E5FF" strokeWidth="2" strokeOpacity="0.9"/>
              {/* Православный крест */}
              <line x1="480" y1="200" x2="500" y2="200" stroke="#FFD700" strokeWidth="3" strokeOpacity="1"/>
              <line x1="490" y1="193" x2="490" y2="215" stroke="#FFD700" strokeWidth="3" strokeOpacity="1"/>
              <line x1="482" y1="208" x2="498" y2="208" stroke="#FFD700" strokeWidth="2" strokeOpacity="0.8"/>
              {/* Нижняя косая перекладина */}
              <line x1="483" y1="213" x2="497" y2="207" stroke="#FFD700" strokeWidth="1.5" strokeOpacity="0.7"/>

              {/* Башня 2 — левая крупная */}
              <rect x="370" y="400" width="60" height="135" fill="#00E5FF" fillOpacity="0.07" stroke="#00E5FF" strokeWidth="1.8" strokeOpacity="0.7"/>
              <ellipse cx="400" cy="378" rx="36" ry="46" fill="#00E5FF" fillOpacity="0.09" stroke="#00E5FF" strokeWidth="2" strokeOpacity="0.8"/>
              <path d="M400,332 Q415,350 400,378 Q385,350 400,332" fill="none" stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.45"/>
              <line x1="400" y1="332" x2="400" y2="300" stroke="#00E5FF" strokeWidth="1.5"/>
              <line x1="394" y1="305" x2="406" y2="305" stroke="#FFD700" strokeWidth="2.5" strokeOpacity="0.95"/>
              <line x1="400" y1="298" x2="400" y2="312" stroke="#FFD700" strokeWidth="2.5" strokeOpacity="0.95"/>
              <line x1="395" y1="309" x2="405" y2="309" stroke="#FFD700" strokeWidth="1.5" strokeOpacity="0.7"/>

              {/* Башня 3 — правая крупная */}
              <rect x="550" y="400" width="60" height="135" fill="#00E5FF" fillOpacity="0.07" stroke="#00E5FF" strokeWidth="1.8" strokeOpacity="0.7"/>
              <ellipse cx="580" cy="378" rx="36" ry="46" fill="#00E5FF" fillOpacity="0.09" stroke="#00E5FF" strokeWidth="2" strokeOpacity="0.8"/>
              <path d="M580,332 Q595,350 580,378 Q565,350 580,332" fill="none" stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.45"/>
              <line x1="580" y1="332" x2="580" y2="300" stroke="#00E5FF" strokeWidth="1.5"/>
              <line x1="574" y1="305" x2="586" y2="305" stroke="#FFD700" strokeWidth="2.5" strokeOpacity="0.95"/>
              <line x1="580" y1="298" x2="580" y2="312" stroke="#FFD700" strokeWidth="2.5" strokeOpacity="0.95"/>
              <line x1="575" y1="309" x2="585" y2="309" stroke="#FFD700" strokeWidth="1.5" strokeOpacity="0.7"/>

              {/* Башня 4 — маленькая левая */}
              <rect x="328" y="460" width="38" height="75" fill="#00E5FF" fillOpacity="0.06" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.6"/>
              <ellipse cx="347" cy="447" rx="22" ry="28" fill="#00E5FF" fillOpacity="0.07" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.65"/>
              <line x1="347" y1="419" x2="347" y2="395" stroke="#00E5FF" strokeWidth="1.2"/>
              <line x1="342" y1="399" x2="352" y2="399" stroke="#FFD700" strokeWidth="2" strokeOpacity="0.9"/>
              <line x1="347" y1="394" x2="347" y2="404" stroke="#FFD700" strokeWidth="2" strokeOpacity="0.9"/>

              {/* Башня 5 — маленькая правая */}
              <rect x="614" y="460" width="38" height="75" fill="#00E5FF" fillOpacity="0.06" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.6"/>
              <ellipse cx="633" cy="447" rx="22" ry="28" fill="#00E5FF" fillOpacity="0.07" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.65"/>
              <line x1="633" y1="419" x2="633" y2="395" stroke="#00E5FF" strokeWidth="1.2"/>
              <line x1="628" y1="399" x2="638" y2="399" stroke="#FFD700" strokeWidth="2" strokeOpacity="0.9"/>
              <line x1="633" y1="394" x2="633" y2="404" stroke="#FFD700" strokeWidth="2" strokeOpacity="0.9"/>

              {/* Декоративные арки основания */}
              <path d="M340,530 Q380,510 420,530" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.5"/>
              <path d="M440,530 Q490,505 540,530" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.5"/>
              <path d="M560,530 Q600,510 640,530" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.5"/>
            </g>

            {/* ======= СПАССКАЯ БАШНЯ — левее Покровского ======= */}
            <g filter="url(#svgGlow)">
              {/* Стена кремля */}
              <rect x="150" y="540" width="220" height="160" fill="#9B30FF" fillOpacity="0.05" stroke="#9B30FF" strokeWidth="1.5" strokeOpacity="0.4"/>
              {/* Зубцы стены */}
              {[150,166,182,198,214,230,246,262,278,294,310,326,342,358].map((x) => (
                <rect key={x} x={x} y={526} width="10" height="16" fill="#9B30FF" fillOpacity="0.15" stroke="#9B30FF" strokeWidth="1" strokeOpacity="0.5"/>
              ))}

              {/* Тело башни — 3 яруса */}
              <rect x="218" y="370" width="100" height="175" fill="#9B30FF" fillOpacity="0.1" stroke="#9B30FF" strokeWidth="2.5" strokeOpacity="0.85"/>
              <rect x="228" y="320" width="80" height="55" fill="#9B30FF" fillOpacity="0.1" stroke="#9B30FF" strokeWidth="2" strokeOpacity="0.75"/>
              <rect x="238" y="280" width="60" height="44" fill="#9B30FF" fillOpacity="0.1" stroke="#9B30FF" strokeWidth="2" strokeOpacity="0.7"/>
              <rect x="248" y="248" width="40" height="36" fill="#9B30FF" fillOpacity="0.12" stroke="#9B30FF" strokeWidth="2" strokeOpacity="0.8"/>

              {/* Часы — крупнее */}
              <circle cx="268" cy="340" r="20" stroke="#FFD700" strokeWidth="2.5" fill="#9B30FF" fillOpacity="0.15" strokeOpacity="0.95"/>
              <circle cx="268" cy="340" r="16" stroke="#FFD700" strokeWidth="1" fill="none" strokeOpacity="0.4"/>
              <line x1="268" y1="326" x2="268" y2="340" stroke="#FFD700" strokeWidth="2" strokeOpacity="0.9"/>
              <line x1="268" y1="340" x2="276" y2="348" stroke="#FFD700" strokeWidth="2" strokeOpacity="0.9"/>

              {/* Шпиль */}
              <line x1="268" y1="248" x2="268" y2="185" stroke="#9B30FF" strokeWidth="2.5" strokeOpacity="0.9"/>
              {/* Рубиновая звезда */}
              <polygon points="268,172 274,188 290,188 278,198 282,214 268,204 254,214 258,198 246,188 262,188"
                fill="#FF2D78" fillOpacity="0.85" stroke="#FF2D78" strokeWidth="1.5"/>
              {/* Арка въезда */}
              <path d="M238,545 L238,480 Q268,455 298,480 L298,545" fill="#9B30FF" fillOpacity="0.12" stroke="#9B30FF" strokeWidth="1.5" strokeOpacity="0.6"/>

              {/* Декор башни — окна */}
              {[0,1].map(r => [0,1,2].map(c => (
                <rect key={`sw${r}-${c}`} x={228+c*28} y={385+r*50} width="16" height="22" rx="2"
                  fill="#9B30FF" fillOpacity="0.12" stroke="#9B30FF" strokeWidth="1" strokeOpacity="0.45"/>
              )))}
            </g>

            {/* ======= КОТЕЛЬНИЧЕСКАЯ ВЫСОТКА — слева ======= */}
            <g filter="url(#svgGlow)" opacity="0.75">
              {/* Крылья */}
              <rect x="20" y="380" width="55" height="320" fill="#00E5FF" fillOpacity="0.04" stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.35"/>
              <rect x="130" y="380" width="55" height="320" fill="#00E5FF" fillOpacity="0.04" stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.35"/>
              {/* Основное тело */}
              <rect x="55" y="250" width="85" height="450" fill="#00E5FF" fillOpacity="0.05" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.5"/>
              {/* Ступени */}
              <rect x="68" y="200" width="59" height="55" fill="#00E5FF" fillOpacity="0.06" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.5"/>
              <rect x="78" y="162" width="39" height="42" fill="#00E5FF" fillOpacity="0.07" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.5"/>
              <rect x="87" y="130" width="21" height="36" fill="#00E5FF" fillOpacity="0.08" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.6"/>
              {/* Шпиль */}
              <line x1="97" y1="130" x2="97" y2="82" stroke="#00E5FF" strokeWidth="2" strokeOpacity="0.8"/>
              <polygon points="97,74 103,88 111,88 105,96 108,106 97,100 86,106 89,96 83,88 91,88"
                fill="#00E5FF" fillOpacity="0.5" stroke="#00E5FF" strokeWidth="1.2"/>
              {/* Окна */}
              {[0,1,2,3].map(r => [0,1,2].map(c => (
                <rect key={`kw${r}-${c}`} x={62+c*24} y={262+r*48} width="14" height="20" rx="1"
                  fill="#00E5FF" fillOpacity="0.1" stroke="#00E5FF" strokeWidth="0.8" strokeOpacity="0.4"/>
              )))}
            </g>

            {/* ======= МГУ ВЫСОТКА — правый край ======= */}
            <g filter="url(#svgGlow)" opacity="0.65">
              <rect x="840" y="320" width="130" height="380" fill="#9B30FF" fillOpacity="0.04" stroke="#9B30FF" strokeWidth="1" strokeOpacity="0.35"/>
              {/* Крылья */}
              <rect x="780" y="400" width="60" height="300" fill="#9B30FF" fillOpacity="0.03" stroke="#9B30FF" strokeWidth="1" strokeOpacity="0.3"/>
              <rect x="970" y="400" width="60" height="300" fill="#9B30FF" fillOpacity="0.03" stroke="#9B30FF" strokeWidth="1" strokeOpacity="0.3"/>
              <rect x="858" y="260" width="94" height="64" fill="#9B30FF" fillOpacity="0.05" stroke="#9B30FF" strokeWidth="1.2" strokeOpacity="0.4"/>
              <rect x="874" y="220" width="62" height="44" fill="#9B30FF" fillOpacity="0.06" stroke="#9B30FF" strokeWidth="1.2" strokeOpacity="0.45"/>
              <rect x="888" y="185" width="34" height="38" fill="#9B30FF" fillOpacity="0.07" stroke="#9B30FF" strokeWidth="1.2" strokeOpacity="0.5"/>
              <line x1="905" y1="185" x2="905" y2="140" stroke="#9B30FF" strokeWidth="2" strokeOpacity="0.7"/>
              <polygon points="905,133 910,147 918,147 912,153 914,163 905,157 896,163 898,153 892,147 900,147"
                fill="#9B30FF" fillOpacity="0.45" stroke="#9B30FF" strokeWidth="1"/>
              {/* Окна */}
              {[0,1,2,3,4].map(r => [0,1,2,3].map(c => (
                <rect key={`mw${r}-${c}`} x={848+c*24} y={332+r*44} width="14" height="20" rx="1"
                  fill="#9B30FF" fillOpacity="0.12" stroke="#9B30FF" strokeWidth="0.8" strokeOpacity="0.4"/>
              )))}
            </g>

            {/* ======= ГОРИЗОНТ И ОТРАЖЕНИЕ ======= */}
            <line x1="0" y1="600" x2="1000" y2="600" stroke="#9B30FF" strokeWidth="1" strokeOpacity="0.3"/>
            <rect x="0" y="600" width="1000" height="100" fill="#9B30FF" fillOpacity="0.04"/>

            {/* Fade из фона снизу */}
            <rect x="0" y="0" width="1000" height="700" fill="url(#skyFade)"/>
          </svg>

          {/* Неоновое свечение под силуэтом */}
          <div className="absolute bottom-0 right-0 w-[70%] h-60 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 60% bottom, rgba(0,229,255,0.08) 0%, rgba(155,48,255,0.08) 40%, transparent 70%)" }} />
        </div>

        {/* Тёмный оверлей слева — чтобы текст читался */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(6,5,26,0.92) 0%, rgba(6,5,26,0.75) 45%, rgba(6,5,26,0.15) 75%, transparent 100%)" }} />

        {/* Ambient glows */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#9B30FF]/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-[#00E5FF]/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 pb-12">
          <div className="flex items-center gap-16 xl:gap-20">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#00E5FF] uppercase tracking-widest mb-8 animate-fade-in-up">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse inline-block" />
                Трейдинговый супер‑портал · Мосбиржа
              </div>

              <h1 className="font-russo leading-none mb-5 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <span className="block text-white text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl">RTrader —</span>
                <span className="block brand-gradient text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl">трейдинговый</span>
                <span className="block text-white text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl">супер‑портал</span>
              </h1>

              <p className="text-white/55 text-base md:text-lg leading-relaxed mb-8 max-w-lg font-light animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                Для того, кто хочет понимать рынок, расти в трейдинге,<br className="hidden sm:block" />
                принимать осознанные решения и зарабатывать<br className="hidden sm:block" />
                без иллюзий «лёгких денег».
              </p>

              <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <button onClick={() => navTo("#community")}
                  className="neon-btn text-sm px-6 py-3 flex items-center gap-2">
                  <Icon name="Users" size={16} />
                  К комьюнити и аналитике
                </button>
                <a href={VIP_URL} target="_blank" rel="noopener noreferrer"
                  className="neon-btn text-sm px-6 py-3 flex items-center gap-2">
                  <Icon name="Crown" size={16} />
                  Войти в VIP-клуб
                </a>
                <button onClick={() => navTo("#education")}
                  className="text-sm text-white/40 hover:text-white/75 transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/50 flex items-center gap-1.5 px-2">
                  Перейти к обучению
                  <Icon name="ArrowRight" size={13} />
                </button>
              </div>
            </div>

            <MiniDashboard />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/25 text-xs">
          <span className="uppercase tracking-widest text-[10px]">Прокрути</span>
          <Icon name="ChevronDown" size={16} className="animate-bounce" />
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap py-2.5">
        <div className="flex animate-ticker whitespace-nowrap">
          {tickerDouble.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-2 px-5 text-xs">
              <span className="font-russo text-white/60">{t.name}</span>
              <span className="text-white/35">{t.price}</span>
              <span className={t.up ? "text-green-400" : "text-red-400"}>{t.change}</span>
              <span className="text-white/10 ml-1">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="container mx-auto px-4 py-12">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="glass-card p-5 text-center">
                <div className="font-russo brand-gradient text-2xl xl:text-3xl mb-1">{s.val}</div>
                <div className="text-white/35 text-xs font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* CAROUSEL */}
      <div className="container mx-auto px-4 pb-16">
        <Reveal className="mb-8 text-center">
          <div className="text-xs text-white/25 uppercase tracking-widest font-semibold mb-2">Разделы портала</div>
          <h2 className="font-russo text-3xl md:text-4xl text-white">Что есть в RTrader</h2>
        </Reveal>
        <Reveal delay={100}>
          <SectionCarousel />
        </Reveal>
      </div>

      {/* MAIN BLOCKS */}
      <main className="container mx-auto px-4 space-y-6 pb-20">
        {SECTIONS.map((section, idx) => (
          <section key={section.id} id={section.id}>
            <Reveal delay={idx * 50}>
              <div className="glass-card p-8 md:p-10">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${section.grad}`}
                        style={{ boxShadow: `0 0 20px ${section.glow}` }}
                      >
                        <Icon name={section.icon} size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-white/25 uppercase tracking-widest font-semibold">
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                        <h2 className="font-russo text-white text-xl leading-tight">{section.title}</h2>
                      </div>
                    </div>
                    <p className="text-white/50 leading-relaxed mb-6 font-light text-sm max-w-lg">
                      {section.description}
                    </p>
                    {section.isVip ? (
                      <a href={VIP_URL} target="_blank" rel="noopener noreferrer"
                        className="neon-btn text-sm px-5 py-2.5 inline-flex items-center gap-2">
                        <Icon name="Crown" size={15} /> Войти в VIP-клуб
                      </a>
                    ) : (
                      <button className="neon-btn-outline text-sm px-5 py-2.5 inline-flex items-center gap-2">
                        {section.cta} <Icon name="ArrowRight" size={14} />
                      </button>
                    )}
                  </div>
                  <div className="flex-shrink-0 w-full md:w-64 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2">
                    {section.bullets.map((b, i) => (
                      <div key={i} className="flex items-start gap-2.5 py-2 border-b border-white/5 last:border-0">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: `${section.accent}22`, border: `1px solid ${section.accent}44` }}>
                          <Icon name="Check" size={11} style={{ color: section.accent }} />
                        </div>
                        <span className="text-xs text-white/55 leading-relaxed">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
        ))}

        {/* VIP BANNER */}
        <Reveal>
          <div className="vip-card p-10 md:p-14 text-center relative overflow-hidden animate-glow-pulse">
            <div className="absolute inset-0 bg-gradient-to-br from-[#9B30FF]/10 to-[#FF2D78]/10 pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-[#FFD700] text-sm font-semibold mb-3">
                <Icon name="Crown" size={16} /> Закрытый клуб
              </div>
              <h2 className="font-russo text-3xl md:text-4xl text-white mb-3">
                Готов торговать на следующем уровне?
              </h2>
              <p className="text-white/40 mb-7 max-w-lg mx-auto font-light text-sm">
                Закрытое комьюнити, регулярная аналитика, разборы портфеля и прямой контакт с автором.
              </p>
              <a href={VIP_URL} target="_blank" rel="noopener noreferrer"
                className="neon-btn inline-flex items-center gap-2 text-base px-8 py-3.5">
                <Icon name="Crown" size={18} /> Войти в VIP-клуб
              </a>
            </div>
          </div>
        </Reveal>

        {/* AUTHOR */}
        <section id="author">
          <Reveal>
            <div className="glass-card p-8 md:p-10">
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl brand-gradient-bg flex items-center justify-center text-3xl animate-float"
                    style={{ boxShadow: "0 0 30px rgba(155,48,255,0.3)" }}>
                    📈
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-white/25 uppercase tracking-widest font-semibold mb-2">Об авторе</div>
                  <h2 className="font-russo text-2xl md:text-3xl text-white mb-3">
                    RTrader — это <span className="brand-gradient">живой опыт</span>
                  </h2>
                  <p className="text-white/48 text-sm leading-relaxed font-light mb-4 max-w-2xl">
                    Практикующий трейдер Московской биржи с 7-летним стажем. Торгую акции и фьючерсы
                    на сырьё, металлы, продовольствие. Слежу за глобальным рынком и геополитикой —
                    потому что они задают фон для каждой сделки. RTrader создан не как очередной
                    инфо-проект, а как рабочий инструмент.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["7 лет на рынке", "МосБиржа", "Фьючерсы", "Психология трейдинга"].map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold border border-white/10 bg-white/5 text-white/45">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* REVIEWS */}
        <ReviewsSection />

        {/* ECOSYSTEM */}
        <Reveal>
          <div className="glass-card p-8 md:p-10">
            <div className="text-xs text-white/25 uppercase tracking-widest font-semibold mb-2">Внешние площадки</div>
            <h2 className="font-russo text-2xl md:text-3xl text-white mb-6">Экосистема RTrader</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {ECOSYSTEM.map((item) => (
                <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer"
                  className="glass-card p-5 flex flex-col items-center gap-3 text-center group hover:scale-105 transition-transform duration-200">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${item.color}22`, border: `1px solid ${item.color}44`, boxShadow: `0 0 16px ${item.color}33` }}>
                    <Icon name={item.icon} size={18} style={{ color: item.color }} />
                  </div>
                  <span className="text-sm font-semibold text-white/60 group-hover:text-white transition-colors">{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* FAQ */}
        <section id="faq">
          <Reveal>
            <div className="glass-card p-8 md:p-10">
              <div className="text-xs text-white/25 uppercase tracking-widest font-semibold mb-2">Вопросы и ответы</div>
              <h2 className="font-russo text-2xl md:text-3xl text-white mb-6">FAQ</h2>
              <div className="space-y-2">
                {FAQ_ITEMS.map((faq, i) => (
                  <div key={i}
                    className="border border-white/8 rounded-xl overflow-hidden cursor-pointer hover:border-white/15 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <div className="flex items-center justify-between p-5">
                      <span className="text-white/85 font-semibold text-sm pr-4">{faq.q}</span>
                      <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={16}
                        className="text-[#9B30FF] flex-shrink-0 transition-transform duration-200" />
                    </div>
                    {openFaq === i && (
                      <div className="px-5 pb-5 text-white/45 text-sm leading-relaxed border-t border-white/5 pt-4">{faq.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* CONTACTS */}
        <Reveal>
          <div className="glass-card p-8 md:p-10 text-center">
            <div className="text-xs text-white/25 uppercase tracking-widest font-semibold mb-2">Связаться</div>
            <h2 className="font-russo text-2xl md:text-3xl text-white mb-3">Остались вопросы?</h2>
            <p className="text-white/40 text-sm mb-6 font-light">Напиши в Telegram — ответим быстро</p>
            <a href={TG_URL} target="_blank" rel="noopener noreferrer"
              className="neon-btn-outline inline-flex items-center gap-2">
              <Icon name="Send" size={16} /> Написать в Telegram
            </a>
          </div>
        </Reveal>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/6 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg brand-gradient-bg flex items-center justify-center">
                <span className="font-russo text-black text-xs font-black">RT</span>
              </div>
              <div>
                <div className="font-russo text-white text-sm tracking-wider">RTRADER</div>
                <div className="text-xs text-white/20">rtrader11.ru</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {NAV_ITEMS.map((item) => (
                <button key={item.href} onClick={() => navTo(item.href)}
                  className="text-xs text-white/22 hover:text-white/60 transition-colors font-medium uppercase tracking-widest">
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {ECOSYSTEM.map((item) => (
                <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg glass-card flex items-center justify-center transition-all hover:scale-110"
                  style={{ color: item.color }} title={item.name}>
                  <Icon name={item.icon} size={14} />
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/18">
            <span>© 2026 RTrader. Материалы носят информационный характер и не являются инвестиционными рекомендациями.</span>
            <span>Торговля на бирже сопряжена с риском потери капитала.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}