import { ChevronLeft } from "./icons";

interface TopBarProps {
  showBack?: boolean;
  onBack?: () => void;
}

export default function TopBar({ showBack = true, onBack }: TopBarProps) {
  return (
    <div className="relative flex items-center justify-between self-stretch px-5 py-3 bg-[#fffcf6]/90 border-b-[0.8px] border-border">
      {/* 왼쪽: 뒤로가기 버튼 */}
      {showBack ? (
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-[#7b6658] cursor-pointer"
        >
          <ChevronLeft size={18} strokeWidth={1.5} />
          <span className="text-sm font-medium">이전</span>
        </button>
      ) : (
        <div className="w-12" />
      )}

      {/* 중앙: 로고 - 화면 정중앙 고정 */}
      <span className="absolute left-1/2 -translate-x-1/2 text-base font-bold text-orange">
        진짜보자 👀
      </span>

      {/* 오른쪽: 빈 공간 (균형용) */}
      <div className="w-12" />
    </div>
  );
}
