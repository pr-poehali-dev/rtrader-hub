/**
 * Рендерит текст статьи:
 * - автоссылки (http/https → <a>)
 * - хэштеги #Тег → кликабельные фильтры (если передан onTag)
 * - компактные абзацы (одинарный перенос = br, двойной = новый абзац)
 */

const URL_RE = /(https?:\/\/[^\s<>"]+)/gi;
const HASHTAG_RE = /(#[\wА-Яа-яёЁ]+)/gu;

type Segment = { type: "text" | "url" | "tag"; value: string };

function tokenize(line: string): Segment[] {
  const segments: Segment[] = [];
  const parts = line.split(URL_RE);
  for (const part of parts) {
    URL_RE.lastIndex = 0;
    if (URL_RE.test(part)) {
      URL_RE.lastIndex = 0;
      segments.push({ type: "url", value: part });
    } else {
      const sub = part.split(HASHTAG_RE);
      for (const s of sub) {
        HASHTAG_RE.lastIndex = 0;
        if (HASHTAG_RE.test(s)) {
          HASHTAG_RE.lastIndex = 0;
          segments.push({ type: "tag", value: s });
        } else if (s) {
          segments.push({ type: "text", value: s });
        }
      }
    }
  }
  URL_RE.lastIndex = 0;
  return segments;
}

function renderSegment(
  seg: Segment,
  key: string,
  onTag?: (tag: string) => void,
  accent = "#9B30FF"
) {
  if (seg.type === "url") {
    let label = "Открыть ссылку";
    try {
      const host = new URL(seg.value).hostname.replace("www.", "");
      if (host.includes("youtube") || host.includes("youtu.be")) label = "YouTube";
      else if (host.includes("t.me") || host.includes("telegram")) label = "Telegram";
      else if (host.includes("drive.google")) label = "Google Drive";
      else if (host.includes("disk.yandex")) label = "Яндекс.Диск";
      else label = host;
    } catch (_e) {
      label = seg.value.slice(0, 30) + "...";
    }
    return (
      <a key={key} href={seg.value} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity break-all"
        style={{ color: accent }}>
        {label}
      </a>
    );
  }
  if (seg.type === "tag") {
    const tagName = seg.value.slice(1);
    return onTag ? (
      <button key={key} type="button"
        onClick={() => onTag(tagName)}
        className="inline font-semibold hover:underline transition-all cursor-pointer"
        style={{ color: accent }}>
        {seg.value}
      </button>
    ) : (
      <span key={key} className="font-semibold" style={{ color: accent }}>{seg.value}</span>
    );
  }
  return <span key={key}>{seg.value}</span>;
}

interface RenderTextProps {
  text: string;
  onTag?: (tag: string) => void;
  accent?: string;
  className?: string;
}

export function RenderText({ text, onTag, accent = "#9B30FF", className = "" }: RenderTextProps) {
  if (!text) return null;

  const paragraphs = text.split(/\n{2,}/);

  return (
    <div className={className}>
      {paragraphs.map((para, pi) => {
        const lines = para.split("\n");
        return (
          <p key={pi} className="mb-3 last:mb-0 leading-relaxed">
            {lines.map((line, li) => {
              const segs = tokenize(line);
              return (
                <span key={li}>
                  {segs.map((seg, si) => renderSegment(seg, `${pi}-${li}-${si}`, onTag, accent))}
                  {li < lines.length - 1 && <br />}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}

export default RenderText;
