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
        flex flex-col items-center justify-center
        gap-2 p-4 rounded-2xl font-bold text-body
        transition
        ${
            selected
                ? "bg-orange-light border-2 border-orange"
                : "bg-card border-[1.5px] border-border hover:bg-section"
        }
      `}
        >
            <span className="text-2xl">{emoji}</span>
            <span>{label}</span>
        </button>
    );
}