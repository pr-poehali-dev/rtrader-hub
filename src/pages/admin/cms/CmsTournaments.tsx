import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { cmsGet, cmsCreate, cmsUpdate, cmsToggleVisible, cmsDelete } from "@/lib/adminCms";
import ImageUpload from "@/components/admin/ImageUpload";
import MediaUpload from "@/components/admin/MediaUpload";
import TagSelect from "@/components/admin/TagSelect";

const SECTION = "tournaments";
const STATUSES = [
  { value: "active", label: "Идёт сейчас", color: "#22c55e" },
  { value: "upcoming", label: "Скоро", color: "#FFD700" },
  { value: "finished", label: "Завершён", color: "#9ca3af" },
];
const TAGS_LIST = ["Акции", "Фьючерсы", "Форекс", "Крипто", "Индексы"];

interface MediaItem { type: "image" | "audio" | "video" | "link"; url: string; label?: string; }

interface Item {
  id: number; name: string; status: string; start_date: string; end_date: string;
  instrument: string; description: string; body: string; tags: string;
  video_url: string; prize: string; participants: number; winner: string;
  result: string; image_url: string; media_items: MediaItem[]; is_visible: boolean; sort_order: number;
}

const empty = (): Omit<Item, "id"> => ({
  name: "", status: "upcoming", start_date: "", end_date: "",
  instrument: "", description: "", body: "", tags: "",
  video_url: "", prize: "", participants: 0, winner: "", result: "",
  image_url: "", media_items: [], is_visible: true, sort_order: 0,
});

export default function CmsTournaments() {
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
      name: item.name, status: item.status, start_date: item.start_date || "",
      end_date: item.end_date || "", instrument: item.instrument || "",
      description: item.description || "", body: item.body || "",
      tags: item.tags || "", video_url: item.video_url || "",
      prize: item.prize || "", participants: item.participants || 0,
      winner: item.winner || "", result: item.result || "",
      image_url: item.image_url || "",
      media_items: Array.isArray(item.media_items) ? item.media_items : [],
      is_visible: item.is_visible, sort_order: item.sort_order,
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
    if (!confirm("Удалить конкурс?")) return;
    await cmsDelete(SECTION, id);
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const f = (k: keyof typeof form, v: unknown) => setForm(prev => ({ ...prev, [k]: v }));
  const statusMeta = STATUSES.find(s => s.value === form.status) || STATUSES[0];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-xs text-white/30 uppercase tracking-widest mb-1">Admin → CMS</div>
          <h1 className="font-russo text-2xl text-white flex items-center gap-2">
            <Icon name="Trophy" size={20} style={{ color: "#FFD700" }} /> Конкурсы
          </h1>
          <p className="text-xs text-white/30 mt-1">Публикуется на <span className="text-[#FFD700]/70">/tournaments</span></p>
        </div>
        {!isNew && !editing && (
          <button onClick={openNew} className="neon-btn text-xs px-4 py-2 flex items-center gap-1.5">
            <Icon name="Plus" size={13} /> Добавить конкурс
          </button>
        )}
      </div>

      {(isNew || editing) && (
        <div className="glass-card p-6 mb-6 border-[#FFD700]/20">
          <div className="flex items-center justify-between mb-5">
            <div className="text-xs text-white/40 uppercase tracking-widest">
              {isNew ? "Новый конкурс" : "Редактировать конкурс"}
            </div>
            <button onClick={closeForm} className="text-white/30 hover:text-white transition-colors">
              <Icon name="X" size={16} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {/* Название + статус */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <label className="text-xs text-white/40 mb-1.5 block">Название конкурса *</label>
                <input value={form.name} onChange={e => f("name", e.target.value)}
                  placeholder="Конкурс трейдеров — Май 2025"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="text-xs text-white/40 mb-1.5 block">Статус</label>
                <div className="flex flex-col gap-1">
                  {STATUSES.map(s => (
                    <button key={s.value} type="button"
                      onClick={() => f("status", s.value)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        form.status === s.value ? "border-white/20 bg-white/8 text-white" : "border-white/5 text-white/30 hover:text-white"
                      }`}>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Даты + инструмент + приз */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="text-xs text-white/40 mb-1.5 block">Дата начала</label>
                <input type="date" value={form.start_date} onChange={e => f("start_date", e.target.value)}
                  className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none" />
              </div>
              <div>
                <label className="text-xs text-white/40 mb-1.5 block">Дата окончания</label>
                <input type="date" value={form.end_date} onChange={e => f("end_date", e.target.value)}
                  className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none" />
              </div>
              <div>
                <label className="text-xs text-white/40 mb-1.5 block">Инструменты</label>
                <input value={form.instrument} onChange={e => f("instrument", e.target.value)}
                  placeholder="Акции, Фьючерсы"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="text-xs text-white/40 mb-1.5 block">Призовой фонд</label>
                <input value={form.prize} onChange={e => f("prize", e.target.value)}
                  placeholder="50 000 ₽"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none transition-colors" />
              </div>
            </div>

            {/* Краткое описание */}
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">
                Краткое описание
                <span className="text-white/20 ml-2">— анонс на карточке</span>
              </label>
              <textarea rows={2} value={form.description} onChange={e => f("description", e.target.value)}
                placeholder="Короткое описание условий конкурса..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none resize-none" />
            </div>

            {/* Полный текст */}
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">
                Полные условия / описание
                <span className="text-white/20 ml-2">— открывается по клику. Ссылки становятся кликабельными</span>
              </label>
              <textarea rows={10} value={form.body} onChange={e => f("body", e.target.value)}
                placeholder="Подробные условия участия, правила, критерии оценки. Можно вставлять ссылки https://..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none resize-y min-h-[140px]" />
            </div>

            {/* Видео */}
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">Ссылка на видео / эфир</label>
              <input value={form.video_url} onChange={e => f("video_url", e.target.value)}
                placeholder="https://youtube.com/..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none transition-colors" />
            </div>

            {/* Победитель (для завершённых) */}
            {form.status === "finished" && (
              <div className="grid grid-cols-2 gap-3 p-4 bg-white/3 rounded-xl border border-white/8">
                <div>
                  <label className="text-xs text-white/40 mb-1.5 block">Победитель</label>
                  <input value={form.winner} onChange={e => f("winner", e.target.value)}
                    placeholder="Имя или ник"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-xs text-white/40 mb-1.5 block">Результат победителя</label>
                  <input value={form.result} onChange={e => f("result", e.target.value)}
                    placeholder="+147%"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none transition-colors" />
                </div>
              </div>
            )}

            {/* Теги */}
            <div>
              <label className="text-xs text-white/40 mb-2 block">Теги (инструменты/направление)</label>
              <TagSelect options={TAGS_LIST} value={form.tags} onChange={v => f("tags", v)} accent="#FFD700" />
            </div>

            {/* Изображение */}
            <div>
              <label className="text-xs text-white/40 mb-2 block">Обложка конкурса</label>
              <ImageUpload value={form.image_url} onChange={v => f("image_url", v)} />
            </div>

            {/* Медиа-материалы */}
            <div>
              <label className="text-xs text-white/40 mb-2 block">Медиа-материалы</label>
              <p className="text-xs text-white/25 mb-2">Добавьте фото, аудио, видео или ссылки к конкурсу</p>
              <MediaUpload value={form.media_items} onChange={v => f("media_items", v)} />
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-white/8">
              <button onClick={save} disabled={saving || !form.name}
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
          <Icon name="Trophy" size={32} className="mx-auto mb-3 text-white/15" />
          <div className="text-white/30 text-sm">Конкурсов пока нет</div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map(item => {
            const st = STATUSES.find(s => s.value === item.status);
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
                    {st && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold border"
                        style={{ color: st.color, borderColor: `${st.color}40`, background: `${st.color}10` }}>
                        {st.label}
                      </span>
                    )}
                    {tagList.map(t => (
                      <span key={t} className="text-xs px-1.5 py-0.5 rounded-md bg-white/5 text-white/40">{t}</span>
                    ))}
                    {item.video_url && <span className="text-xs text-white/25 flex items-center gap-0.5"><Icon name="Play" size={10} /> видео</span>}
                    {!item.is_visible && <span className="text-xs text-white/25 italic">скрыто</span>}
                  </div>
                  <div className="font-semibold text-white/85 text-sm">{item.name}</div>
                  <div className="text-xs text-white/30 mt-0.5">
                    {item.prize && <span>Приз: {item.prize}</span>}
                    {item.status === "finished" && item.winner && <span className="ml-2">· Победитель: {item.winner} {item.result}</span>}
                  </div>
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