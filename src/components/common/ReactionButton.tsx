interface ReactionButtonProps {
  emoji: string;
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function ReactionButton({
                                         emoji,
                                         label,
                                         selected = false,
                                         onClick,
                                       }: ReactionButtonProps) {
  return (
      <button
          onClick={onClick}
          className={`
        flex flex-col items-start justify-center
        gap-2 p-4 rounded-2xl
        transition
        ${
              selected
                  ? "bg-orange-light border-[1.5px] border-orange"
                  : "bg-card border-[0.8px] border-border hover:bg-section"
          }
      `}
      >
        <span className="text-2xl">{emoji}</span>
        <span className="text-sm font-bold text-text">{label}</span>
      </button>
  );
}