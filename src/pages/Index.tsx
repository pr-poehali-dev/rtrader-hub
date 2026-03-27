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
        {/* Moscow skyline SVG background */}
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden">
          <svg
            viewBox="0 0 1440 520"
            preserveAspectRatio="xMidYMax slice"
            className="w-full absolute bottom-0"
            style={{ opacity: 0.18, filter: "blur(0.5px)" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="neonViolet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9B30FF" stopOpacity="1" />
                <stop offset="100%" stopColor="#9B30FF" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="neonCyan" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00E5FF" stopOpacity="1" />
                <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="neonPink" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF2D78" stopOpacity="1" />
                <stop offset="100%" stopColor="#FF2D78" stopOpacity="0.2" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* ===== КРЕМЛЬ - центр ===== */}
            {/* Главная Спасская башня */}
            <g filter="url(#glow)" stroke="#9B30FF" strokeWidth="1.5" fill="none">
              {/* Тело башни */}
              <rect x="680" y="300" width="48" height="140" stroke="#9B30FF" fill="#9B30FF" fillOpacity="0.08"/>
              {/* Ярус 2 */}
              <rect x="688" y="268" width="32" height="36" fill="#9B30FF" fillOpacity="0.1"/>
              {/* Ярус 3 */}
              <rect x="694" y="242" width="20" height="30" fill="#9B30FF" fillOpacity="0.1"/>
              {/* Звёздный шпиль */}
              <line x1="704" y1="242" x2="704" y2="195"/>
              <polygon points="704,188 708,202 720,202 710,210 714,224 704,216 694,224 698,210 688,202 700,202" fill="#FF2D78" fillOpacity="0.7" stroke="#FF2D78"/>
              {/* Часы */}
              <circle cx="704" cy="280" r="8" stroke="#FFD700" strokeWidth="1" fill="none"/>
              <line x1="704" y1="276" x2="704" y2="280" stroke="#FFD700"/>
              <line x1="704" y1="280" x2="707" y2="283" stroke="#FFD700"/>
              {/* Арка */}
              <path d="M688,440 L688,380 Q704,360 720,380 L720,440" fill="#9B30FF" fillOpacity="0.15"/>
            </g>

            {/* Никольская башня - левее */}
            <g filter="url(#glow)" stroke="#9B30FF" strokeWidth="1.2" fill="none">
              <rect x="620" y="320" width="38" height="120" fill="#9B30FF" fillOpacity="0.07"/>
              <rect x="626" y="295" width="26" height="30" fill="#9B30FF" fillOpacity="0.09"/>
              <rect x="631" y="272" width="16" height="26" fill="#9B30FF" fillOpacity="0.1"/>
              {/* Готический шпиль */}
              <polygon points="639,272 645,285 651,272 651,265 645,255 639,265" fill="#9B30FF" fillOpacity="0.2"/>
              <line x1="645" y1="255" x2="645" y2="215"/>
              <polygon points="645,208 650,220 656,220 651,226 653,234 645,229 637,234 639,226 634,220 640,220" fill="#FF2D78" fillOpacity="0.6" stroke="#FF2D78" strokeWidth="0.8"/>
            </g>

            {/* Боровицкая башня */}
            <g stroke="#9B30FF" strokeWidth="1" fill="none">
              <rect x="748" y="330" width="34" height="110" fill="#9B30FF" fillOpacity="0.06"/>
              <rect x="753" y="308" width="24" height="26" fill="#9B30FF" fillOpacity="0.08"/>
              <line x1="765" y1="308" x2="765" y2="268"/>
              <polygon points="765,262 770,275 776,275 771,281 773,289 765,284 757,289 759,281 754,275 760,275" fill="#FF2D78" fillOpacity="0.55" stroke="#FF2D78" strokeWidth="0.8"/>
            </g>

            {/* Кремлёвская стена */}
            <g stroke="#9B30FF" strokeWidth="1.5" fill="none">
              <path d="M580,440 L580,390 L620,390 L620,440" fill="#9B30FF" fillOpacity="0.05"/>
              {/* Зубцы */}
              {[580,590,600,610].map(x => (
                <rect key={x} x={x} y={382} width="6" height="10" fill="#9B30FF" fillOpacity="0.2" stroke="#9B30FF"/>
              ))}
              <path d="M750,440 L750,390 L800,390 L800,440" fill="#9B30FF" fillOpacity="0.05"/>
              {[750,760,770,780,790].map(x => (
                <rect key={x} x={x} y={382} width="6" height="10" fill="#9B30FF" fillOpacity="0.2" stroke="#9B30FF"/>
              ))}
            </g>

            {/* ===== ПОКРОВСКИЙ СОБОР (Василий Блаженный) - правее Кремля ===== */}
            <g filter="url(#glow)" stroke="#00E5FF" strokeWidth="1.2" fill="none">
              {/* Центральная башня */}
              <rect x="850" y="310" width="36" height="130" fill="#00E5FF" fillOpacity="0.06"/>
              {/* Луковичный купол центр */}
              <ellipse cx="868" cy="295" rx="22" ry="30" fill="#00E5FF" fillOpacity="0.08" stroke="#00E5FF"/>
              <path d="M846,295 Q868,258 890,295" fill="#00E5FF" fillOpacity="0.12"/>
              <line x1="868" y1="265" x2="868" y2="238"/>
              {/* Крест */}
              <line x1="864" y1="238" x2="872" y2="238" stroke="#FFD700" strokeWidth="1.5"/>
              <line x1="868" y1="234" x2="868" y2="242" stroke="#FFD700" strokeWidth="1.5"/>
              <line x1="865" y1="240" x2="871" y2="240" stroke="#FFD700" strokeWidth="1"/>

              {/* Боковая башня 1 */}
              <rect x="820" y="340" width="24" height="100" fill="#00E5FF" fillOpacity="0.05"/>
              <ellipse cx="832" cy="328" rx="14" ry="18" fill="#00E5FF" fillOpacity="0.07" stroke="#00E5FF" strokeWidth="1"/>
              <path d="M818,328 Q832,308 846,328" fill="#00E5FF" fillOpacity="0.1"/>
              <line x1="832" y1="310" x2="832" y2="290"/>
              <line x1="829" y1="290" x2="835" y2="290" stroke="#FFD700"/>
              <line x1="832" y1="287" x2="832" y2="293" stroke="#FFD700"/>

              {/* Боковая башня 2 */}
              <rect x="892" y="340" width="24" height="100" fill="#00E5FF" fillOpacity="0.05"/>
              <ellipse cx="904" cy="328" rx="14" ry="18" fill="#00E5FF" fillOpacity="0.07" stroke="#00E5FF" strokeWidth="1"/>
              <path d="M890,328 Q904,308 918,328" fill="#00E5FF" fillOpacity="0.1"/>
              <line x1="904" y1="310" x2="904" y2="290"/>
              <line x1="901" y1="290" x2="907" y2="290" stroke="#FFD700"/>
              <line x1="904" y1="287" x2="904" y2="293" stroke="#FFD700"/>

              {/* Малые купола */}
              {[808, 830, 892, 916].map((x, i) => (
                <g key={i}>
                  <ellipse cx={x} cy={350 - i % 2 * 10} rx="8" ry="10" fill="#00E5FF" fillOpacity="0.06" stroke="#00E5FF" strokeWidth="0.8"/>
                </g>
              ))}
            </g>

            {/* ===== ЗДАНИЯ СПРАВА (бизнес/жилые) ===== */}
            {/* Высотка МГУ - далеко справа */}
            <g stroke="#9B30FF" strokeWidth="1" fill="none" opacity="0.7">
              <rect x="1050" y="260" width="60" height="180" fill="#9B30FF" fillOpacity="0.05"/>
              <rect x="1065" y="220" width="30" height="44" fill="#9B30FF" fillOpacity="0.06"/>
              <rect x="1073" y="192" width="14" height="32" fill="#9B30FF" fillOpacity="0.07"/>
              <line x1="1080" y1="192" x2="1080" y2="162"/>
              <polygon points="1080,156 1084,166 1088,166 1084,170 1086,178 1080,174 1074,178 1076,170 1072,166 1076,166" fill="#9B30FF" fillOpacity="0.4" stroke="#9B30FF" strokeWidth="0.8"/>
              {/* Крылья */}
              <rect x="1020" y="300" width="30" height="140" fill="#9B30FF" fillOpacity="0.04"/>
              <rect x="1110" y="300" width="30" height="140" fill="#9B30FF" fillOpacity="0.04"/>
              {/* Окна */}
              {[0,1,2,3,4].map(r => [0,1,2].map(c => (
                <rect key={`${r}-${c}`} x={1056 + c * 18} y={272 + r * 30} width="8" height="14" fill="#9B30FF" fillOpacity="0.15" stroke="#9B30FF" strokeWidth="0.5"/>
              )))}
            </g>

            {/* Современные здания справа */}
            <g stroke="#FF2D78" strokeWidth="1" fill="none" opacity="0.6">
              <rect x="960" y="340" width="44" height="100" fill="#FF2D78" fillOpacity="0.04"/>
              <polygon points="960,340 982,310 1004,340" fill="#FF2D78" fillOpacity="0.07"/>
              {[0,1,2].map(r => [0,1].map(c => (
                <rect key={`${r}-${c}`} x={966 + c * 18} y={350 + r * 28} width="10" height="16" fill="#FF2D78" fillOpacity="0.12" stroke="#FF2D78" strokeWidth="0.5"/>
              )))}
            </g>

            {/* ===== ЗДАНИЯ СЛЕВА ===== */}
            {/* Высотка Котельническая */}
            <g stroke="#00E5FF" strokeWidth="1" fill="none" opacity="0.65">
              <rect x="340" y="270" width="56" height="170" fill="#00E5FF" fillOpacity="0.04"/>
              <rect x="354" y="238" width="28" height="36" fill="#00E5FF" fillOpacity="0.05"/>
              <rect x="361" y="212" width="14" height="30" fill="#00E5FF" fillOpacity="0.06"/>
              <line x1="368" y1="212" x2="368" y2="178"/>
              <polygon points="368,172 372,182 378,182 373,187 375,196 368,191 361,196 363,187 358,182 364,182" fill="#00E5FF" fillOpacity="0.4" stroke="#00E5FF" strokeWidth="0.8"/>
              {/* Крылья */}
              <rect x="310" y="310" width="30" height="130" fill="#00E5FF" fillOpacity="0.03"/>
              <rect x="396" y="310" width="30" height="130" fill="#00E5FF" fillOpacity="0.03"/>
            </g>

            {/* Обычные здания слева */}
            <g stroke="#9B30FF" strokeWidth="0.8" fill="none" opacity="0.5">
              <rect x="160" y="360" width="50" height="80" fill="#9B30FF" fillOpacity="0.04"/>
              <rect x="215" y="340" width="40" height="100" fill="#9B30FF" fillOpacity="0.04"/>
              <rect x="260" y="350" width="35" height="90" fill="#9B30FF" fillOpacity="0.04"/>
              {/* Окна */}
              {[160, 215, 260].map((bx, bi) => [0,1].map(r => [0,1].map(c => (
                <rect key={`l${bi}-${r}-${c}`} x={bx+8+c*16} y={370+r*24} width="8" height="12" fill="#9B30FF" fillOpacity="0.12" stroke="#9B30FF" strokeWidth="0.4"/>
              ))))}
            </g>

            {/* ===== ОТРАЖЕНИЕ / ГОРИЗОНТАЛЬНАЯ ЛИНИЯ ===== */}
            <line x1="0" y1="440" x2="1440" y2="440" stroke="#9B30FF" strokeWidth="0.5" strokeOpacity="0.4"/>
            <rect x="0" y="440" width="1440" height="80" fill="url(#neonViolet)" fillOpacity="0.05"/>

            {/* ===== НЕОНОВЫЕ КОНТУРЫ (свечение поверх) ===== */}
            {/* Спасская башня — яркий контур */}
            <rect x="680" y="300" width="48" height="140" stroke="#9B30FF" strokeWidth="1" fill="none" strokeOpacity="0.6"/>
            <circle cx="704" cy="280" r="8" stroke="#FFD700" strokeWidth="0.8" fill="none" strokeOpacity="0.8"/>
            {/* Покровский — яркий контур */}
            <ellipse cx="868" cy="295" rx="22" ry="30" stroke="#00E5FF" strokeWidth="1" fill="none" strokeOpacity="0.7"/>
            <ellipse cx="832" cy="328" rx="14" ry="18" stroke="#00E5FF" strokeWidth="0.8" fill="none" strokeOpacity="0.6"/>
            <ellipse cx="904" cy="328" rx="14" ry="18" stroke="#00E5FF" strokeWidth="0.8" fill="none" strokeOpacity="0.6"/>
          </svg>

          {/* Радиальное свечение под силуэтом */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-40 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center bottom, rgba(155,48,255,0.12) 0%, rgba(0,229,255,0.06) 50%, transparent 70%)" }} />
        </div>

        {/* Ambient glows */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#9B30FF]/6 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF2D78]/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#00E5FF]/5 rounded-full blur-[80px] pointer-events-none" />

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