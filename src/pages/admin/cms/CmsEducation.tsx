import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { cmsGet, cmsCreate, cmsUpdate, cmsToggleVisible, cmsDelete } from "@/lib/adminCms";
import ImageUpload from "@/components/admin/ImageUpload";
import MediaUpload from "@/components/admin/MediaUpload";
import TagSelect from "@/components/admin/TagSelect";

const SECTION = "education";
const LEVELS = ["Начинающий", "Средний", "Продвинутый", "Любой"];
const TAGS_LIST = ["Психология", "Технический анализ", "Риск-менеджмент", "Фундаментал", "Стратегия", "Инструменты"];

interface MediaItem { type: "image" | "audio" | "video" | "link"; url: string; label?: string; }

interface Item {
  id: number; number: string; title: string; description: string;
  body: string; lessons: number; duration: string; level: string;
  topics: string; tags: string; video_url: string; image_url: string;
  media_items: MediaItem[]; is_free: boolean; is_visible: boolean; sort_order: number;
}

const empty = (): Omit<Item, "id"> => ({
  number: "", title: "", description: "", body: "",
  lessons: 0, duration: "", level: "Начинающий",
  topics: "", tags: "", video_url: "", image_url: "",
  media_items: [], is_free: false, is_visible: true, sort_order: 0,
});

export default function CmsEducation() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Item | null>(null);
  const [form, setForm] = useState(empty());
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const d = await cmsGet(SECTION);
    setItems(d.items || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(empty()); setEditing(null); setIsNew(true); window.scrollTo(0, 0); };
  const openEdit = (item: Item) => {
    setForm({
      number: item.number, title: item.title, description: item.description,
      body: item.body || "", lessons: item.lessons, duration: item.duration,
      level: item.level, topics: item.topics, tags: item.tags || "",
      video_url: item.video_url || "", image_url: item.image_url || "",
      media_items: Array.isArray(item.media_items) ? item.media_items : [],
      is_free: item.is_free, is_visible: item.is_visible, sort_order: item.sort_order,
    });
    setEditing(item); setIsNew(false); window.scrollTo(0, 0);
  };
  const closeForm = () => { setEditing(null); setIsNew(false); };

  const save = async () => {
    setSaving(true);
    if (isNew) await cmsCreate(SECTION, form);
    else if (editing) await cmsUpdate(SECTION, editing.id, form);
    await load(); setSaving(false); closeForm();
  };

  const toggle = async (item: Item) => {
    await cmsToggleVisible(SECTION, item.id, !item.is_visible);
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, is_visible: !i.is_visible } : i));
  };

  const remove = async (id: number) => {
    if (!confirm("Удалить материал?")) return;
    await cmsDelete(SECTION, id);
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const f = (k: keyof typeof form, v: unknown) => setForm(prev => ({ ...prev, [k]: v }));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-xs text-white/30 uppercase tracking-widest mb-1">Admin → CMS</div>
          <h1 className="font-russo text-2xl text-white flex items-center gap-2">
            <Icon name="BookOpen" size={20} style={{ color: "#38BDF8" }} /> Обучение
          </h1>
          <p className="text-xs text-white/30 mt-1">Публикуется на <span className="text-[#38BDF8]/70">/education</span></p>
        </div>
        {!isNew && !editing && (
          <button onClick={openNew} className="neon-btn text-xs px-4 py-2 flex items-center gap-1.5">
            <Icon name="Plus" size={13} /> Добавить материал
          </button>
        )}
      </div>

      {(isNew || editing) && (
        <div className="glass-card p-6 mb-6 border-[#38BDF8]/20">
          <div className="flex items-center justify-between mb-5">
            <div className="text-xs text-white/40 uppercase tracking-widest">
              {isNew ? "Новый учебный материал" : "Редактировать материал"}
            </div>
            <button onClick={closeForm} className="text-white/30 hover:text-white transition-colors">
              <Icon name="X" size={16} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {/* Заголовок + номер */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label className="text-xs text-white/40 mb-1.5 block">№ урока / модуля</label>
                <input value={form.number} onChange={e => f("number", e.target.value)}
                  placeholder="01"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none transition-colors" />
              </div>
              <div className="md:col-span-3">
                <label className="text-xs text-white/40 mb-1.5 block">Заголовок *</label>
                <input value={form.title} onChange={e => f("title", e.target.value)}
                  placeholder="Основы технического анализа"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none transition-colors" />
              </div>
            </div>

            {/* Краткое описание */}
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">
                Краткое описание
                <span className="text-white/20 ml-2">— отображается на карточке в списке</span>
              </label>
              <textarea rows={2} value={form.description} onChange={e => f("description", e.target.value)}
                placeholder="Анонс материала (2–3 предложения)"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none resize-none" />
            </div>

            {/* Полный текст */}
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">
                Полный текст материала
                <span className="text-white/20 ml-2">— открывается по клику. Ссылки становятся кликабельными</span>
              </label>
              <textarea rows={12} value={form.body} onChange={e => f("body", e.target.value)}
                placeholder="Текст урока. Можно вставлять ссылки https://... (они автоматически станут кликабельными), хэштеги #Тема..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none resize-y min-h-[180px]" />
            </div>

            {/* Видео */}
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">
                Ссылка на видео
                <span className="text-white/20 ml-2">— YouTube, VK Video, Telegram и т.п.</span>
              </label>
              <input value={form.video_url} onChange={e => f("video_url", e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none transition-colors" />
            </div>

            {/* Дополнительные поля */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-white/40 mb-1.5 block">Уровень</label>
                <select value={form.level} onChange={e => f("level", e.target.value)}
                  className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none">
                  {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-white/40 mb-1.5 block">Длительность</label>
                <input value={form.duration} onChange={e => f("duration", e.target.value)}
                  placeholder="45 мин"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="text-xs text-white/40 mb-1.5 block">Уроков в модуле</label>
                <input type="number" value={form.lessons} onChange={e => f("lessons", parseInt(e.target.value) || 0)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none transition-colors" />
              </div>
            </div>

            {/* Теги */}
            <div>
              <label className="text-xs text-white/40 mb-2 block">Теги</label>
              <TagSelect options={TAGS_LIST} value={form.tags} onChange={v => f("tags", v)} accent="#38BDF8" />
            </div>

            {/* Изображение */}
            <div>
              <label className="text-xs text-white/40 mb-2 block">Обложка материала</label>
              <ImageUpload value={form.image_url} onChange={v => f("image_url", v)} />
            </div>

            {/* Медиа-материалы */}
            <div>
              <label className="text-xs text-white/40 mb-2 block">Медиа-материалы</label>
              <p className="text-xs text-white/25 mb-2">Добавьте фото, аудио, видео или ссылки к уроку</p>
              <MediaUpload value={form.media_items} onChange={v => f("media_items", v)} />
            </div>

            {/* Чекбокс бесплатно */}
            <label className="flex items-center gap-2.5 cursor-pointer w-fit">
              <input type="checkbox" checked={form.is_free} onChange={e => f("is_free", e.target.checked)}
                className="w-4 h-4 rounded accent-[#38BDF8]" />
              <span className="text-sm text-white/60">Бесплатный материал (без VIP)</span>
            </label>

            <div className="flex items-center gap-3 pt-2 border-t border-white/8">
              <button onClick={save} disabled={saving || !form.title}
                className="neon-btn text-sm px-6 py-2.5 disabled:opacity-40">
                {saving ? "Сохраняю..." : "Сохранить"}
              </button>
              <button onClick={closeForm} className="text-sm text-white/40 hover:text-white px-3 py-2 transition-colors">
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-white/30 text-sm flex items-center gap-2 py-8">
          <Icon name="Loader2" size={14} className="animate-spin" /> Загружаю...
        </div>
      ) : items.length === 0 ? (
        <div className="glass-card p-10 text-center">
          <Icon name="BookOpen" size={32} className="mx-auto mb-3 text-white/15" />
          <div className="text-white/30 text-sm">Материалов пока нет</div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map(item => {
            const tagList = (item.tags || "").split(",").map(t => t.trim()).filter(Boolean);
            return (
              <div key={item.id}
                className={`glass-card p-4 flex items-start gap-4 transition-all ${!item.is_visible ? "opacity-40" : ""}`}>
                {item.image_url && (
                  <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                    <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {item.number && <span className="text-xs text-white/25 font-mono">#{item.number}</span>}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${item.is_free ? "bg-green-500/15 text-green-400" : "bg-[#38BDF8]/15 text-[#38BDF8]"}`}>
                      {item.is_free ? "Бесплатно" : "VIP"}
                    </span>
                    <span className="text-xs text-white/25">{item.level}</span>
                    {item.video_url && <span className="text-xs text-white/25 flex items-center gap-0.5"><Icon name="Play" size={10} /> видео</span>}
                    {tagList.map(t => (
                      <span key={t} className="text-xs px-1.5 py-0.5 rounded-md bg-white/5 text-white/40">{t}</span>
                    ))}
                    {!item.is_visible && <span className="text-xs text-white/25 italic">скрыто</span>}
                  </div>
                  <div className="font-semibold text-white/85 text-sm">{item.title}</div>
                  {item.description && <div className="text-xs text-white/35 mt-0.5 line-clamp-1">{item.description}</div>}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => openEdit(item)} className="p-1.5 text-white/30 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                    <Icon name="Pencil" size={13} />
                  </button>
                  <button onClick={() => toggle(item)} className={`p-1.5 rounded-lg transition-all ${item.is_visible ? "text-green-400/70 hover:text-green-400" : "text-white/25 hover:text-white"}`}>
                    <Icon name={item.is_visible ? "Eye" : "EyeOff"} size={13} />
                  </button>
                  <button onClick={() => remove(item.id)} className="p-1.5 text-red-400/40 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all">
                    <Icon name="Trash2" size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}