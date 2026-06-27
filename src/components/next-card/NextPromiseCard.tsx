interface NextPromiseCardProps {
  cardLabel: string; // "진짜보자 2차 카드"
  roomMeta: string; // "고등학교 친구방 · 밥"
  badgeText: string; // "시간만 좁히면 되는 단계"
  title: string; // "이제 시간만 좁혀보자"
  descriptions: string[]; // 설명 줄들
  hintText: string; // "날짜 확정이 아니에요..."
  actionLabel: string; // "가능한 시간대 고르기"
  onAction?: () => void;
}

export default function NextPromiseCard({
  cardLabel,
  roomMeta,
  badgeText,
  title,
  descriptions,
  hintText,
  actionLabel,
  onAction,
}: NextPromiseCardProps) {
  return (
    <div
      className="self-stretch overflow-hidden rounded-2xl border-[0.8px] border-[#f0be83]"
      style={{ boxShadow: "0px 4px 16px 0 rgba(36,21,14,0.08)" }}
    >
      {/* 카드 헤더 */}
      <div className="flex justify-between items-center px-4 py-2.5 bg-[#fff7ea] border-b-[0.8px] border-[#f0be83]">
        <p className="text-[9px] font-bold uppercase text-orange">
          {cardLabel}
        </p>
        <p className="text-[9px] text-muted">{roomMeta}</p>
      </div>

      {/* 카드 본문 */}
      <div className="flex flex-col p-4 bg-card gap-2">
        {/* 뱃지 */}
        <div className="inline-flex items-center h-7 px-3 rounded-full bg-orange w-fit">
          <p className="text-[10px] font-bold text-white">{badgeText}</p>
        </div>

        {/* 제목 */}
        <p className="text-base font-bold text-text">{title}</p>

        {/* 설명 */}
        {descriptions.map((desc, i) => (
          <p key={i} className="text-xs text-muted">
            {desc}
          </p>
        ))}

        {/* 힌트 박스 */}
        <div className="px-3 py-2 rounded-[14px] bg-[#fff1e3] border-[0.8px] border-[#f0be83]">
          <p className="text-[10px] font-bold text-[#d85f1f]">{hintText}</p>
        </div>

        {/* 액션 버튼 */}
        <button
          onClick={onAction}
          className="w-full py-2.5 rounded-[14px] bg-orange text-sm font-bold text-white hover:bg-orange-dark transition"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}
