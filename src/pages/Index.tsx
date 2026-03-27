import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/39a4ac3c-06be-41f0-97f1-cc3959260964/files/38224658-9c47-4aad-9b3c-4cc8e407f717.jpg";

const NAV_ITEMS = [
  { label: "Обучение", href: "#education" },
  { label: "Аналитика", href: "#analytics" },
  { label: "Комьюнити", href: "#community" },
  { label: "VIP-клуб", href: "#vip" },
  { label: "Конкурсы", href: "#contests" },
  { label: "Рефлексии", href: "#reflexions" },
  { label: "Об авторе", href: "#author" },
  { label: "FAQ", href: "#faq" },
];

const TICKER_ITEMS = [
  { name: "SBER", price: "318.45", change: "+1.2%" },
  { name: "GAZP", price: "172.80", change: "-0.4%" },
  { name: "LKOH", price: "7 240", change: "+0.8%" },
  { name: "NVTK", price: "1 045", change: "+2.1%" },
  { name: "GMKN", price: "143 600", change: "-1.1%" },
  { name: "ROSN", price: "511.4", change: "+0.3%" },
  { name: "Si-6.25", price: "85 320", change: "+0.6%" },
  { name: "RI-6.25", price: "112 450", change: "+1.4%" },
  { name: "BR-5.25", price: "74.85", change: "-0.9%" },
  { name: "GOLD-6.25", price: "9 815", change: "+1.7%" },
  { name: "NG-5.25", price: "2.84", change: "+3.2%" },
  { name: "WHEAT-5.25", price: "582", change: "-0.5%" },
];

const SECTIONS = [
  {
    id: "education",
    icon: "BookOpen",
    title: "Обучение",
    subtitle: "База знаний трейдера",
    description:
      "Структурированный курс от базовых принципов рынка до продвинутых стратегий торговли фьючерсами на Мосбирже. Видеоуроки, разборы сделок, интерактивные тесты.",
    tags: ["Акции РФ", "Фьючерсы", "Риск-менеджмент", "Теханализ"],
    color: "from-[#4169FF] to-[#9B30FF]",
    glowColor: "rgba(65, 105, 255, 0.3)",
    items: [
      "Основы технического и фундаментального анализа",
      "Торговля фьючерсами на сырьё, металлы, продукты",
      "Психология управления позицией",
      "Разборы реальных сделок и кейсов",
    ],
  },
  {
    id: "analytics",
    icon: "TrendingUp",
    title: "Аналитика",
    subtitle: "Идеи и прогнозы",
    description:
      "Еженедельные торговые идеи, технический анализ ключевых активов Мосбиржи, взгляд на глобальный рынок и геополитику. Всегда держим руку на пульсе.",
    tags: ["Мосбиржа", "Глобальный рынок", "Геополитика", "Идеи"],
    color: "from-[#FFD700] to-[#FF8C00]",
    glowColor: "rgba(255, 200, 0, 0.25)",
    items: [
      "Торговые идеи по акциям РФ",
      "Анализ сырьевых и металлических фьючерсов",
      "Обзор мирового рынка и нефти",
      "Геополитический контекст и его влияние",
    ],
  },
  {
    id: "community",
    icon: "Users",
    title: "Комьюнити",
    subtitle: "Сообщество трейдеров",
    description:
      "Живые обсуждения рынка, обмен идеями и опытом. Чаты по инструментам, еженедельные онлайн-встречи, взаимная поддержка трейдеров всех уровней.",
    tags: ["Чаты", "Обсуждения", "Нетворкинг", "Telegram"],
    color: "from-[#00E5FF] to-[#4169FF]",
    glowColor: "rgba(0, 229, 255, 0.25)",
    items: [
      "Чат по акциям и фьючерсам 24/5",
      "Тематические каналы по инструментам",
      "Еженедельные созвоны и разборы",
      "Telegram-канал RTrader11",
    ],
  },
  {
    id: "vip",
    icon: "Crown",
    title: "VIP-клуб",
    subtitle: "Закрытый контент",
    description:
      "Эксклюзивный доступ к закрытым торговым сигналам, разборам портфеля в реальном времени, приватным стратегиям и прямым консультациям.",
    tags: ["Сигналы", "Портфель", "Приоритет", "Эксклюзив"],
    color: "from-[#FF2D78] to-[#9B30FF]",
    glowColor: "rgba(155, 48, 255, 0.35)",
    vip: true,
    items: [
      "Закрытые торговые сигналы в реальном времени",
      "Разборы портфеля с автором",
      "Приватные стратегии и алгоритмы входа",
      "Прямой доступ к автору и команде",
    ],
  },
  {
    id: "contests",
    icon: "Trophy",
    title: "Конкурсы и турниры",
    subtitle: "Виртуальная торговля",
    description:
      "Соревнования по виртуальной торговле с турнирной таблицей. Проверь свои стратегии без риска, сравни результаты с сотнями трейдеров и выиграй призы.",
    tags: ["Турнир", "Рейтинг", "Призы", "Стратегии"],
    color: "from-[#FF8C00] to-[#FF2D78]",
    glowColor: "rgba(255, 140, 0, 0.3)",
    items: [
      "Виртуальный торговый счёт для соревнований",
      "Live-турнирная таблица",
      "Недельные и месячные чемпионаты",
      "Разборы лучших стратегий победителей",
    ],
  },
  {
    id: "reflexions",
    icon: "Brain",
    title: "Рефлексии трейдера",
    subtitle: "Психология и дисциплина",
    description:
      "Глубокие статьи о психологии торговли, дисциплине, работе с убытками и эмоциями. Потому что успех в трейдинге на 80% — это работа над собой.",
    tags: ["Психология", "Дисциплина", "Mindset", "Статьи"],
    color: "from-[#9B30FF] to-[#FF2D78]",
    glowColor: "rgba(155, 48, 255, 0.3)",
    items: [
      "Работа с эмоциями в убыточных сделках",
      "Как выработать торговую дисциплину",
      "Психология принятия решений под давлением",
      "Дневник трейдера: зачем и как вести",
    ],
  },
];

const FAQ_ITEMS = [
  {
    q: "Для кого RTrader?",
    a: "Для начинающих и опытных трейдеров, торгующих на Мосбирже: акции, фьючерсы на сырьё, металлы, продовольствие. Подойдёт тем, кто хочет систематизировать подход и найти сообщество единомышленников.",
  },
  {
    q: "Чем VIP-клуб отличается от бесплатного контента?",
    a: "В VIP-клубе — закрытые торговые сигналы в реальном времени, разборы портфеля автора, приватные стратегии и прямой доступ к консультациям. Бесплатный контент — это обучение, статьи и базовая аналитика.",
  },
  {
    q: "Как участвовать в конкурсах?",
    a: "Регистрируешься, получаешь виртуальный счёт и торгуешь. Результаты отображаются в реальном времени в общей турнирной таблице. Без реальных денег — только стратегия и мастерство.",
  },
  {
    q: "Есть ли связь с Telegram-каналом?",
    a: "Да, все публикации на rtrader11.ru зеркалятся в Telegram-канале RTrader11. Ты можешь следить за обновлениями там или на сайте — удобно как тебе.",
  },
  {
    q: "Какие рынки покрывает RTrader?",
    a: "Фокус — Московская биржа: акции РФ, фьючерсы на нефть, газ, золото, металлы, зерновые. Также следим за глобальным рынком и геополитикой, которые влияют на российские активы.",
  },
];

function useIntersection(ref: React.RefObject<Element>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref as React.RefObject<Element>);
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const tickerDouble = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="neon-grid-bg min-h-screen text-white font-montserrat">
      {/* НАВИГАЦИЯ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/70 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => scrollTo("#hero")}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-lg brand-gradient-bg flex items-center justify-center shadow-lg">
              <span className="font-russo text-black text-sm font-black">RT</span>
            </div>
            <span className="font-russo text-xl tracking-wider">
              R<span className="brand-gradient">TRADER</span>
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="nav-link"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://t.me/RTrader11"
              target="_blank"
              rel="noopener noreferrer"
              className="neon-btn-outline text-sm px-4 py-2 flex items-center gap-2"
            >
              <Icon name="Send" size={14} />
              Telegram
            </a>
            <a
              href="https://web-app-hosting--preview.poehali.dev/login"
              target="_blank"
              rel="noopener noreferrer"
              className="neon-btn text-sm px-4 py-2"
            >
              VIP-клуб
            </a>
          </div>

          <button
            className="lg:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 px-4 py-6">
            <div className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="text-left nav-link text-base py-2 border-b border-white/5"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex gap-3 pt-4">
                <a
                  href="https://t.me/RTrader11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-btn-outline flex-1 text-center text-sm py-2"
                >
                  Telegram
                </a>
                <a
                  href="https://web-app-hosting--preview.poehali.dev/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-btn flex-1 text-center text-sm py-2"
                >
                  VIP-клуб
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="RTrader"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06051a]/60 via-[#06051a]/40 to-[#06051a]" />
        </div>

        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#9B30FF]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#FF2D78]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 pt-24 pb-16">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#00E5FF] uppercase tracking-widest mb-8 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse inline-block" />
              Трейдинговый портал · Мосбиржа
            </div>

            <h1 className="font-russo text-5xl md:text-7xl lg:text-8xl leading-none mb-6 animate-fade-in-up delay-100">
              <span className="block text-white">ТОРГУЙ</span>
              <span className="block brand-gradient">УМНЕЕ.</span>
              <span className="block text-white/90">РАСТИ</span>
              <span className="block brand-gradient">БЫСТРЕЕ.</span>
            </h1>

            <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed font-light animate-fade-in-up delay-200">
              RTrader — экосистема для трейдеров, торгующих на Московской бирже.
              Обучение, аналитика, комьюнити, VIP-клуб и конкурсы — всё в одном месте.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
              <button
                onClick={() => scrollTo("#education")}
                className="neon-btn text-base px-8 py-4"
              >
                Начать обучение
              </button>
              <a
                href="https://web-app-hosting--preview.poehali.dev/login"
                target="_blank"
                rel="noopener noreferrer"
                className="neon-btn-outline text-base px-8 py-4 flex items-center gap-2"
              >
                <Icon name="Crown" size={18} />
                Войти в VIP-клуб
              </a>
            </div>

            <div className="flex flex-wrap gap-8 mt-14 animate-fade-in-up delay-400">
              {[
                { val: "5 000+", label: "Трейдеров в сообществе" },
                { val: "200+", label: "Уроков и разборов" },
                { val: "3 года", label: "На рынке" },
                { val: "МосБиржа", label: "Основная площадка" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-russo text-2xl brand-gradient">{s.val}</span>
                  <span className="text-xs text-white/40 mt-1 font-medium">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs">
          <span>Прокрути</span>
          <Icon name="ChevronDown" size={18} className="animate-bounce" />
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap py-3">
        <div className="flex animate-ticker whitespace-nowrap">
          {tickerDouble.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-2 px-6 text-sm">
              <span className="font-russo text-white/80 text-xs">{t.name}</span>
              <span className="text-white/50">{t.price}</span>
              <span
                className={
                  t.change.startsWith("+")
                    ? "text-green-400 text-xs"
                    : "text-red-400 text-xs"
                }
              >
                {t.change}
              </span>
              <span className="text-white/10 ml-2">|</span>
            </span>
          ))}
        </div>
      </div>

      {/* СЕКЦИИ */}
      <main className="container mx-auto px-4 py-20 space-y-32">
        {SECTIONS.map((section, idx) => (
          <section key={section.id} id={section.id} className="section-glow relative">
            <AnimatedSection>
              <div
                className={`flex flex-col ${
                  idx % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                } gap-12 items-start`}
              >
                <div className="flex-1">
                  <div className="relative mb-4">
                    <span className="section-number">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${section.color} bg-opacity-10 border border-white/10 text-xs font-semibold uppercase tracking-widest text-white/70 mb-4`}
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      <Icon name={section.icon} size={12} fallback="Circle" />
                      {section.subtitle}
                    </div>
                  </div>

                  <h2 className="font-russo text-4xl md:text-5xl text-white mb-4">
                    {section.title}
                  </h2>

                  <p className="text-white/60 text-lg leading-relaxed mb-8 font-light max-w-xl">
                    {section.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {section.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-semibold border border-white/10 bg-white/5 text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {section.id === "vip" ? (
                    <a
                      href="https://web-app-hosting--preview.poehali.dev/login"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neon-btn inline-flex items-center gap-2"
                    >
                      <Icon name="Crown" size={16} />
                      Вступить в VIP-клуб
                    </a>
                  ) : section.id === "community" ? (
                    <a
                      href="https://t.me/RTrader11"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neon-btn inline-flex items-center gap-2"
                    >
                      <Icon name="Send" size={16} />
                      Присоединиться в Telegram
                    </a>
                  ) : (
                    <button className="neon-btn-outline inline-flex items-center gap-2">
                      Перейти
                      <Icon name="ArrowRight" size={16} />
                    </button>
                  )}
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {section.items.map((item, i) => (
                    <div
                      key={i}
                      className="glass-card p-5 flex items-start gap-3"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${section.color}`}
                        style={{ boxShadow: `0 0 16px ${section.glowColor}` }}
                      >
                        <Icon name="Check" size={14} className="text-white" />
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </section>
        ))}

        {/* VIP BANNER */}
        <AnimatedSection>
          <div className="vip-card p-10 md:p-16 text-center relative overflow-hidden animate-glow-pulse">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#9B30FF]/20 blur-[60px] pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-[#FFD700] text-sm font-semibold mb-4">
                <Icon name="Crown" size={16} />
                Закрытый клуб
              </div>
              <h2 className="font-russo text-3xl md:text-5xl text-white mb-4">
                Готов торговать на следующем уровне?
              </h2>
              <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto font-light">
                Войди в VIP-клуб RTrader и получи доступ к сигналам, разборам и
                прямому контакту с автором.
              </p>
              <a
                href="https://web-app-hosting--preview.poehali.dev/login"
                target="_blank"
                rel="noopener noreferrer"
                className="neon-btn text-lg px-10 py-4 inline-flex items-center gap-2"
              >
                <Icon name="Crown" size={20} />
                Вступить в VIP-клуб
              </a>
            </div>
          </div>
        </AnimatedSection>

        {/* ОБ АВТОРЕ */}
        <section id="author">
          <AnimatedSection>
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-shrink-0 relative">
                <div
                  className="w-56 h-56 rounded-2xl glass-card flex items-center justify-center animate-float"
                  style={{ boxShadow: "0 0 60px rgba(155, 48, 255, 0.25)" }}
                >
                  <div className="text-7xl">📈</div>
                </div>
                <div className="absolute -bottom-3 -right-3 px-4 py-2 rounded-xl brand-gradient-bg text-black text-xs font-bold">
                  Автор · Трейдер
                </div>
              </div>

              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-semibold uppercase tracking-widest text-white/50 mb-4">
                  <Icon name="User" size={12} />
                  Об авторе
                </div>
                <h2 className="font-russo text-4xl md:text-5xl text-white mb-6">
                  RTrader — это
                  <br />
                  <span className="brand-gradient">живой опыт</span>
                </h2>
                <p className="text-white/60 text-lg leading-relaxed mb-6 font-light">
                  Практикующий трейдер Московской биржи. Торгую акции и фьючерсы
                  на сырьё, металлы, продовольствие. Слежу за глобальным рынком и
                  геополитикой — потому что они задают фон для каждой сделки.
                </p>
                <p className="text-white/50 leading-relaxed mb-8 font-light">
                  RTrader создан не как очередной инфо-проект, а как рабочий
                  инструмент — место, где трейдеры учатся, анализируют и растут
                  вместе. Без воды и маркетинга.
                </p>
                <a
                  href="https://t.me/RTrader11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-btn-outline flex items-center gap-2 text-sm inline-flex"
                >
                  <Icon name="Send" size={14} />
                  Telegram-канал
                </a>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* FAQ */}
        <section id="faq">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-semibold uppercase tracking-widest text-white/50 mb-4">
                <Icon name="HelpCircle" size={12} />
                Вопросы и ответы
              </div>
              <h2 className="font-russo text-4xl md:text-5xl text-white">FAQ</h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {FAQ_ITEMS.map((faq, i) => (
                <div
                  key={i}
                  className="glass-card overflow-hidden cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="flex items-center justify-between p-6">
                    <span className="text-white/90 font-semibold text-sm md:text-base pr-4">
                      {faq.q}
                    </span>
                    <Icon
                      name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                      size={18}
                      className="text-[#9B30FF] flex-shrink-0 transition-transform duration-200"
                    />
                  </div>
                  {openFaq === i && (
                    <div className="px-6 pb-6 text-white/50 text-sm leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </section>

        {/* КОНТАКТЫ */}
        <section id="contacts">
          <AnimatedSection>
            <div className="glass-card p-10 md:p-14 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-semibold uppercase tracking-widest text-white/50 mb-4">
                <Icon name="MessageCircle" size={12} />
                Связаться
              </div>
              <h2 className="font-russo text-3xl md:text-4xl text-white mb-4">
                Остались вопросы?
              </h2>
              <p className="text-white/50 text-lg mb-8 font-light">
                Напиши нам в Telegram — ответим быстро
              </p>
              <a
                href="https://t.me/RTrader11"
                target="_blank"
                rel="noopener noreferrer"
                className="neon-btn inline-flex items-center gap-2"
              >
                <Icon name="Send" size={18} />
                Написать в Telegram
              </a>
            </div>
          </AnimatedSection>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg brand-gradient-bg flex items-center justify-center">
                <span className="font-russo text-black text-xs font-black">RT</span>
              </div>
              <div>
                <div className="font-russo text-white text-sm tracking-wider">RTRADER</div>
                <div className="text-xs text-white/30">rtrader11.ru</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="text-xs text-white/30 hover:text-white/70 transition-colors font-medium uppercase tracking-widest"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <a
              href="https://t.me/RTrader11"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-[#00E5FF] hover:text-white transition-colors"
            >
              <Icon name="Send" size={16} />
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/20">
            <span>
              © 2024 RTrader. Материалы носят информационный характер и не
              являются инвестиционными рекомендациями.
            </span>
            <span>Торговля на бирже сопряжена с риском потери капитала.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}