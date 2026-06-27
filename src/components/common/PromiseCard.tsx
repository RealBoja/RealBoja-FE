interface PromiseCardProps {
    cardLabel?: string;      // "진짜보자 약속카드"
    roomLabel?: string;      // "고등학교 친구방 · 밥"
    badge?: string;          // "이 방 마지막 만남: 거의 전설"
    title: string;           // '"나중에 보자"만 반복 중'
    description?: string;     // "날짜를 정하기 전에,\n먼저 만날 마음부터..."
    hint?: string;           // "생존자 3명부터 약속 온도 상승"
    onAction?: () => void;
}

export default function PromiseCard({
                                        cardLabel = "진짜보자 약속카드",
                                        roomLabel,
                                        badge,
                                        title,
                                        description,
                                        hint,
                                        onAction,
                                    }: PromiseCardProps) {
    return (
        <div className="w-full overflow-hidden rounded-3xl border-[0.8px] border-border-point bg-card shadow-[0_6px_24px_0_rgba(36,21,14,0.1)]">
            {/* 상단 헤더 (배경 cardWeak + 하단 테두리) */}
            <div className="flex items-center justify-between border-b-[0.8px] border-border-point bg-cardWeak px-5 py-3">
        <span className="text-[10px] font-bold uppercase text-orange">
          {cardLabel}
        </span>
                {roomLabel && (
                    <span className="text-[10px] text-muted">{roomLabel}</span>
                )}
            </div>

            {/* 본문 */}
            <div className="px-5 pb-4 pt-5">
                {/* 마지막 만남 - 주황 알약 배지 */}
                {badge && (
                    <span className="inline-block rounded-full bg-orange px-3 py-1 text-xs font-bold text-white">
            {badge}
          </span>
                )}

                {/* 큰 제목 (위 16) */}
                <h2 className="mt-4 text-base font-bold text-text">{title}</h2>

                {/* 설명 (위 16) */}
                {description && (
                    <p className="mt-4 whitespace-pre-line text-sm text-text">
                        {description}
                    </p>
                )}

                {/* 🔥 힌트 박스 (위 16) */}
                {hint && (
                    <div className="mt-4 flex items-center gap-2 rounded-[14px] border-[0.8px] border-border-point bg-orange-light px-4 py-2.5">
                        <span className="text-base">🔥</span>
                        <span className="text-xs font-bold text-orange-dark">{hint}</span>
                    </div>
                )}
            </div>

            {/* 버튼 (좌우 20, 아래 20) */}
            <div className="px-5 pb-5">
                <button
                    onClick={onAction}
                    className="w-full rounded-2xl bg-orange py-3.5 text-base font-bold text-white shadow-[0_3px_12px_0_rgba(233,120,47,0.3)] transition hover:bg-orange-dark active:bg-orange-dark"
                >
                    진짜 볼 사람? 🔥
                </button>
            </div>
        </div>
    );
}