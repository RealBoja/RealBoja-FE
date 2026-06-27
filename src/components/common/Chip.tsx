type ChipProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
};

export function Chip({ label, selected = false, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col justify-center items-center
        px-3 py-1.5 rounded-full border-[0.8px] text-sm font-medium transition-colors
        ${
          selected
            ? "bg-orange text-white border-orange"
            : "bg-bg text-text border-border"
        }
      `}
    >
      {label}
    </button>
  );
}
