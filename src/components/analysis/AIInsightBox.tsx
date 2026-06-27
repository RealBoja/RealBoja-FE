// src/components/analysis/AIInsightBox.tsx
interface AIInsightBoxProps {
  text: string;
}

export default function AIInsightBox({ text }: AIInsightBoxProps) {
  return (
    <div className="p-4 rounded-2xl bg-card border-[0.8px] border-border">
      <p className="text-[10px] font-bold uppercase text-orange">결과 분석</p>
      <p className="pt-1.5 text-xs text-text">{text}</p>
    </div>
  );
}
