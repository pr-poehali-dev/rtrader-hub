import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import {
  SECTIONS, REVIEWS_TEXT, REVIEWS_SCREENSHOTS, ECOSYSTEM, FAQ_ITEMS, TG_URL, VIP_URL,
  Reveal,
} from "./IndexShared";

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

          <div className="border-t border-white/8 pt-8">
            <div className="text-xs text-white/25 uppercase tracking-widest font-semibold mb-4">Скриншоты из чата</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {REVIEWS_SCREENSHOTS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setLightbox(s.id)}
                  className="screenshot-card group relative overflow-hidden rounded-xl aspect-[4/3] flex items-center justify-center"
                >
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

interface IndexContentProps {
  openFaq: number | null;
  setOpenFaq: (v: number | null) => void;
}

export default function IndexContent({ openFaq, setOpenFaq }: IndexContentProps) {
  return (
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
                  <Link
                    to={section.href}
                    className="neon-btn-outline text-sm px-5 py-2.5 inline-flex items-center gap-2"
                  >
                    {section.cta} <Icon name="ArrowRight" size={14} />
                  </Link>
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
            <Link to="/vip"
              className="neon-btn inline-flex items-center gap-2 text-base px-8 py-3.5">
              <Icon name="Crown" size={18} /> Узнать о VIP-клубе
            </Link>
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
  );
}
