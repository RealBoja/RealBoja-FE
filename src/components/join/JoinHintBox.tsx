// src/components/join/JoinHintBox.tsx
interface JoinHintBoxProps {
  text: string;
}

export default function JoinHintBox({ text }: JoinHintBoxProps) {
  return (
    <div className="flex items-center gap-2.5 self-stretch px-4 py-3 rounded-[14px] bg-[#fff8ec] border-[0.8px] border-[#eedccb]">
      <p className="text-base">👀</p>
      <p className="text-xs text-muted">{text}</p>
    </div>
  );
}
