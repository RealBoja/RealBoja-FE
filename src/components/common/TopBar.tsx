import { ChevronLeft } from "./icons";

interface TopBarProps {
  showBack?: boolean;
  onBack?: () => void;
}

export default function TopBar({ showBack = true, onBack }: TopBarProps) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      {showBack ? (
        <button onClick={onBack} className="flex items-center gap-1 text-muted">
          <ChevronLeft size={18} />
          <span className="text-body">이전</span>
        </button>
      ) : (
        <div />
      )}
      <span className="font-brand font-extrabold text-orange">진짜보자 👀</span>
    </div>
  );
}
