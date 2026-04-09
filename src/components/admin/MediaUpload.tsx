import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";
import { getAdminToken } from "@/hooks/useAdminAuth";

const UPLOAD_URL = "https://functions.poehali.dev/b53b7edb-1a17-424c-8ad3-25cc3b256dd0";

type MediaType = "image" | "audio" | "video" | "link";

interface MediaItem {
  type: MediaType;
  url: string;
  label?: string;
}

interface Props {
  value: MediaItem[];
  onChange: (items: MediaItem[]) => void;
}

const ACCEPT_MAP: Record<Exclude<MediaType, "link">, string> = {
  image: "image/*",
  audio: "audio/mp3,audio/mpeg,audio/ogg,audio/wav,audio/m4a,audio/aac,.mp3,.ogg,.wav,.m4a,.aac",
  video: "video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov",
};

const HINT_MAP: Record<Exclude<MediaType, "link">, string> = {
  image: "JPG, PNG, WebP — до 10 МБ",
  audio: "MP3, OGG, WAV, M4A — до 20 МБ",
  video: "MP4, WebM, MOV — до 50 МБ",
};

const ICON_MAP: Record<MediaType, string> = {
  image: "Image",
  audio: "Music",
  video: "Video",
  link: "Link",
};

const LABEL_MAP: Record<MediaType, string> = {
  image: "Фото",
  audio: "Аудио",
  video: "Видео",
  link: "Ссылка",
};

function MediaPreview({ item, onRemove }: { item: MediaItem; onRemove: () => void }) {
  return (
    <div className="relative group flex flex-col gap-1.5 bg-white/5 border border-white/10 rounded-xl p-2.5">
      <div className="flex items-center gap-2 mb-1">
        <Icon name={ICON_MAP[item.type]} size={13} className="text-white/40 shrink-0" />
        <span className="text-xs text-white/40 font-medium">{LABEL_MAP[item.type]}</span>
        <button
          type="button"
          onClick={onRemove}
          className="ml-auto w-5 h-5 rounded-md bg-black/40 flex items-center justify-center text-white/30 hover:text-red-400 transition-colors"
        >
          <Icon name="X" size={11} />
        </button>
      </div>

      {item.type === "image" && (
        <div className="w-full h-28 rounded-lg overflow-hidden bg-black/30">
          <img src={item.url} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      {item.type === "audio" && (
        <audio controls className="w-full h-9" style={{ filter: "invert(1) hue-rotate(180deg)" }}>
          <source src={item.url} />
        </audio>
      )}

      {item.type === "video" && (
        <video controls className="w-full rounded-lg max-h-36 bg-black/30">
          <source src={item.url} />
        </video>
      )}

      {item.type === "link" && (
        <a href={item.url} target="_blank" rel="noopener noreferrer"
          className="text-xs text-[#FFD700]/70 hover:text-[#FFD700] truncate transition-colors">
          {item.label || item.url}
        </a>
      )}
    </div>
  );
}

export default function MediaUpload({ value, onChange }: Props) {
  const [activeTab, setActiveTab] = useState<MediaType>("image");
  const [uploading, setUploading] = useState<MediaType | null>(null);
  const [error, setError] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkLabel, setLinkLabel] = useState("");
  const [uploadMode, setUploadMode] = useState<"url" | "file">("file");
  const [imageUrl, setImageUrl] = useState("");
  const fileRefs = {
    image: useRef<HTMLInputElement>(null),
    audio: useRef<HTMLInputElement>(null),
    video: useRef<HTMLInputElement>(null),
  };

  const addItem = (item: MediaItem) => {
    onChange([...value, item]);
  };

  const removeItem = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  const uploadFile = async (file: File, type: MediaType) => {
    if (type === "link") return;
    setUploading(type);
    setError("");
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = (e.target?.result as string) || "";
        const res = await fetch(UPLOAD_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Admin-Token": getAdminToken(),
          },
          body: JSON.stringify({ file: base64, filename: file.name }),
        });
        const data = await res.json();
        if (data.url) {
          addItem({ type, url: data.url });
        } else {
          setError("Ошибка: " + (data.error || "неизвестная"));
        }
        setUploading(null);
      };
      reader.readAsDataURL(file);
    } catch {
      setError("Ошибка сети");
      setUploading(null);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: MediaType) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file, type);
    e.target.value = "";
  };

  const addLink = () => {
    if (!linkUrl.trim()) return;
    addItem({ type: "link", url: linkUrl.trim(), label: linkLabel.trim() || undefined });
    setLinkUrl("");
    setLinkLabel("");
  };

  const addImageByUrl = () => {
    if (!imageUrl.trim()) return;
    addItem({ type: "image", url: imageUrl.trim() });
    setImageUrl("");
  };

  const TABS: MediaType[] = ["image", "audio", "video", "link"];

  return (
    <div className="flex flex-col gap-3">
      {/* Таб-бар */}
      <div className="flex gap-1 p-1 bg-white/5 rounded-xl w-fit">
        {TABS.map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === tab ? "bg-white/12 text-white" : "text-white/35 hover:text-white"
            }`}
          >
            <Icon name={ICON_MAP[tab]} size={12} />
            {LABEL_MAP[tab]}
          </button>
        ))}
      </div>

      {/* Контент таба */}
      {activeTab === "image" && (
        <div className="flex flex-col gap-2">
          <div className="flex gap-1 p-0.5 bg-white/5 rounded-lg w-fit">
            <button type="button" onClick={() => setUploadMode("file")}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${uploadMode === "file" ? "bg-white/10 text-white" : "text-white/35 hover:text-white"}`}>
              С диска
            </button>
            <button type="button" onClick={() => setUploadMode("url")}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${uploadMode === "url" ? "bg-white/10 text-white" : "text-white/35 hover:text-white"}`}>
              По ссылке
            </button>
          </div>
          {uploadMode === "file" ? (
            <DropZone
              accept={ACCEPT_MAP.image}
              hint={HINT_MAP.image}
              icon="ImagePlus"
              uploading={uploading === "image"}
              fileRef={fileRefs.image}
              onFileChange={e => onFileChange(e, "image")}
              onDrop={file => uploadFile(file, "image")}
            />
          ) : (
            <div className="flex gap-2">
              <input
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="https://... (прямая ссылка на изображение)"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FFD700]/40 transition-colors"
              />
              <button type="button" onClick={addImageByUrl}
                disabled={!imageUrl.trim()}
                className="px-4 py-2 rounded-xl bg-white/8 border border-white/10 text-xs text-white/70 hover:text-white hover:bg-white/12 transition-all disabled:opacity-40">
                Добавить
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === "audio" && (
        <DropZone
          accept={ACCEPT_MAP.audio}
          hint={HINT_MAP.audio}
          icon="Music"
          uploading={uploading === "audio"}
          fileRef={fileRefs.audio}
          onFileChange={e => onFileChange(e, "audio")}
          onDrop={file => uploadFile(file, "audio")}
        />
      )}

      {activeTab === "video" && (
        <DropZone
          accept={ACCEPT_MAP.video}
          hint={HINT_MAP.video}
          icon="Video"
          uploading={uploading === "video"}
          fileRef={fileRefs.video}
          onFileChange={e => onFileChange(e, "video")}
          onDrop={file => uploadFile(file, "video")}
        />
      )}

      {activeTab === "link" && (
        <div className="flex flex-col gap-2">
          <input
            value={linkUrl}
            onChange={e => setLinkUrl(e.target.value)}
            placeholder="https://youtube.com/... или любая ссылка"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FFD700]/40 transition-colors"
          />
          <input
            value={linkLabel}
            onChange={e => setLinkLabel(e.target.value)}
            placeholder="Подпись (необязательно)"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FFD700]/40 transition-colors"
          />
          <button type="button" onClick={addLink}
            disabled={!linkUrl.trim()}
            className="self-start px-4 py-2 rounded-xl bg-white/8 border border-white/10 text-xs text-white/70 hover:text-white hover:bg-white/12 transition-all disabled:opacity-40 flex items-center gap-1.5">
            <Icon name="Plus" size={12} /> Добавить ссылку
          </button>
        </div>
      )}

      {error && (
        <div className="text-xs text-red-400 flex items-center gap-1">
          <Icon name="AlertCircle" size={12} /> {error}
        </div>
      )}

      {/* Список добавленных медиа */}
      {value.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
          {value.map((item, idx) => (
            <MediaPreview key={idx} item={item} onRemove={() => removeItem(idx)} />
          ))}
        </div>
      )}
    </div>
  );
}

function DropZone({ accept, hint, icon, uploading, fileRef, onFileChange, onDrop }: {
  accept: string;
  hint: string;
  icon: string;
  uploading: boolean;
  fileRef: React.RefObject<HTMLInputElement>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (file: File) => void;
}) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) onDrop(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
      onClick={() => fileRef.current?.click()}
      className="w-full border-2 border-dashed border-white/15 hover:border-white/30 rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer transition-all text-center"
    >
      <input ref={fileRef} type="file" accept={accept} className="hidden" onChange={onFileChange} />
      {uploading ? (
        <div className="flex items-center gap-2 text-white/40 text-sm">
          <Icon name="Loader2" size={16} className="animate-spin" /> Загружаю...
        </div>
      ) : (
        <>
          <Icon name={icon} size={24} className="text-white/25" />
          <div className="text-sm text-white/40">Перетащи файл или кликни для выбора</div>
          <div className="text-xs text-white/20">{hint}</div>
        </>
      )}
    </div>
  );
}