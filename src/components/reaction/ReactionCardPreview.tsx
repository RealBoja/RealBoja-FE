// src/components/reaction/ReactionCardPreview.tsx
interface ReactionCardPreviewProps {
  title: string;
  description: string;
}

export default function ReactionCardPreview({
  title,
  description,
}: ReactionCardPreviewProps) {
  return (
    <div className="self-stretch px-4 py-3 rounded-[14px] bg-[#fff7ea] border-[0.8px] border-[#f0be83]">
      <p className="text-[9px] font-bold uppercase text-orange">
        진짜보자 카드
      </p>
      <p className="pt-1 text-xs font-bold text-text">{title}</p>
      <p className="pt-0.5 text-[10px] text-muted">{description}</p>
    </div>
  );
}
