// "만날 마음은 확인됐어요..." + "만남 목적: 밥" 칩
interface ContextSummaryProps {
  description: string;
  purpose: string;
}

export default function ContextSummary({
  description,
  purpose,
}: ContextSummaryProps) {
  return (
    <div className="flex flex-col gap-2 self-stretch">
      <p className="text-xs text-muted">{description}</p>
      <div className="flex items-center gap-2">
        <p className="text-[10px] text-muted">만남 목적:</p>
        <div className="px-2 py-0.5 rounded-full bg-[#fff1e3] border-[0.8px] border-[#f0be83]">
          <p className="text-[10px] font-bold text-[#d85f1f]">{purpose}</p>
        </div>
      </div>
    </div>
  );
}
