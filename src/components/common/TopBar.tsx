import { ChevronLeft } from "./icons";

interface TopBarProps {
  showBack?: boolean;
  onBack?: () => void;
}

export default function TopBar({ showBack = true, onBack }: TopBarProps) {
  return (
    <div
      className="relative flex items-center justify-between self-stretch px-5 py-3 border-b border-border"
      style={{ background: "rgba(255, 252, 246, 0.9)" }}
    >
      {/* 왼쪽: 뒤로가기 버튼 */}
      {showBack ? (
        <button onClick={onBack} className="flex items-center gap-1 text-muted">
          <ChevronLeft size={18} />
          <span className="text-body">이전</span>
        </button>
      ) : (
        <div className="w-[60px]" />
      )}

      {/* 중앙: 로고 */}
      <span className="absolute left-1/2 -translate-x-1/2 font-brand font-extrabold text-orange">
        진짜보자 👀
      </span>

      {/* 오른쪽: 빈 공간 (균형 맞추기용) */}
      <div className="w-[60px]" />
    </div>
  );
}
