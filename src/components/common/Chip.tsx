// Chip.tsx
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
        px-4 py-2 rounded-full border text-sm font-medium transition-colors
        ${
          selected
            ? "bg-[#E9782F] text-white border-[#E9782F]"
            : "bg-[#FFFCF6] text-[#24150E] border-[#EEDCCB]"
        }
      `}
    >
      {label}
    </button>
  );
}
