import { Chip } from "./Chip";

type ChipGroupProps = {
  label: string;
  options: string[];
  selected?: string;
  onSelect?: (value: string) => void;
};

export function ChipGroup({
  label,
  options,
  selected,
  onSelect,
}: ChipGroupProps) {
  return (
    <div className="flex flex-col items-start self-stretch pt-6 first:pt-0">
      <p className="text-sm font-bold text-text">{label}</p>
      <div className="flex flex-wrap items-center gap-2.5 pt-3">
        {options.map((option) => (
          <Chip
            key={option}
            label={option}
            selected={selected === option}
            onClick={() => onSelect?.(option)}
          />
        ))}
      </div>
    </div>
  );
}
