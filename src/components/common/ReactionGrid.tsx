import { useState } from "react";
import ReactionButton from "./ReactionButton";

interface Reaction {
  id: string;
  emoji: string;
  label: string;
}

interface ReactionGridProps {
  purposeLabel?: string; // 예: "밥", "카페", "술", "그냥 얼굴 보기"
  onSelect?: (id: string) => void;
}

export default function ReactionGrid({
  purposeLabel = "밥",
  onSelect,
}: ReactionGridProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const REACTIONS: Reaction[] = [
    { id: "fire", emoji: "🔥", label: "나 진짜 볼래" },
    { id: "rice", emoji: "🚶", label: `${purposeLabel}이면 감` },
    { id: "grab", emoji: "🙋", label: "누가 잡으면 감" },
    { id: "eyes", emoji: "👀", label: "일단 생존신고" },
  ];

  const handleSelect = (id: string) => {
    setSelected(id);
    onSelect?.(id);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {REACTIONS.map((r) => (
        <ReactionButton
          key={r.id}
          emoji={r.emoji}
          label={r.label}
          selected={selected === r.id}
          onClick={() => handleSelect(r.id)}
        />
      ))}
    </div>
  );
}
