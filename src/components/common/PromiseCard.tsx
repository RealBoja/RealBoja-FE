import dogPlain from "@/assets/dog-mascot-plain.png";
import dogFunny from "@/assets/dog-mascot-funny.png";
import dogAnnoying from "@/assets/dog-mascot-annoying.png";
import dogEmotional from "@/assets/dog-mascot-emotional.png";

const TONE_IMAGE_MAP: Record<string, string> = {
  PLAIN: dogPlain,
  FUNNY: dogFunny,
  ANNOYING: dogAnnoying,
  EMOTIONAL: dogEmotional,
};

interface PromiseCardProps {
  cardLabel?: string;
  roomLabel?: string;
  badge?: string;
  title?: string;
  description?: string;
  hint?: string;
  ctaText?: string;
  tone?: string; // 추가
  onAction?: () => void;
}

export default function PromiseCard({
  cardLabel = "진짜보자 약속카드",
  roomLabel,
  badge,
  title,
  description,
  hint,
  ctaText = "진짜 볼 사람? 🔥",
  tone,
  onAction,
}: PromiseCardProps) {
  const dogImage = TONE_IMAGE_MAP[tone ?? "PLAIN"] ?? dogPlain;

  return (
    <div className="w-full overflow-hidden rounded-3xl border-[0.8px] border-border-point bg-card shadow-[0_6px_24px_0_rgba(36,21,14,0.1)]">
      <div className="flex items-center justify-between border-b-[0.8px] border-border-point bg-cardWeak px-5 py-3">
        <span className="text-[10px] font-bold uppercase text-orange">
          {cardLabel}
        </span>
        {roomLabel && (
          <span className="text-[10px] text-muted">{roomLabel}</span>
        )}
      </div>

      <div className="px-5 pb-4 pt-5">
        {badge && (
          <span className="inline-block rounded-full bg-orange px-3 py-1 text-xs font-bold text-white">
            {badge}
          </span>
        )}

        {title && (
          <h2 className="mt-4 text-base font-bold text-text">{title}</h2>
        )}

        {description && (
          <div className="mt-4 text-text">
            {description.split("\n").map((line, idx) => (
              <p
                key={idx}
                className={idx === 0 ? "text-base font-bold" : "mt-3 text-sm"}
              >
                {line}
              </p>
            ))}
          </div>
        )}

        <div className="mt-4 flex justify-center">
          <img
            src={dogImage}
            alt="카드 톤에 맞는 강아지 캐릭터"
            className="h-32 w-32 object-contain"
          />
        </div>

        {hint && (
          <div className="mt-4 flex items-center gap-2 rounded-[14px] border-[0.8px] border-border-point bg-orange-light px-4 py-2.5">
            <span className="text-base">🔥</span>
            <span className="text-xs font-bold text-orange-dark">{hint}</span>
          </div>
        )}
      </div>

      <div className="px-5 pb-5">
        <button
          onClick={onAction}
          className="w-full rounded-2xl bg-orange py-3.5 text-base font-bold text-white shadow-[0_3px_12px_0_rgba(233,120,47,0.3)] transition hover:bg-orange-dark active:bg-orange-dark"
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
}
