import { Thermometer } from "lucide-react";

interface PromiseCardProps {
    roomLabel?: string;      // "고등학교 친구방 · 밥"
    caption?: string;        // "이 방 마지막 만남: 거의 전설"
    title: string;           // "'나중에 보자'만 반복 중"
    description?: string;     // "생존자 3명만 모이면 약속 해동 시작"
    initialTemp?: number;    // 18
    onAction?: () => void;
}

export default function PromiseCard({
                                        roomLabel,
                                        caption,
                                        title,
                                        description,
                                        initialTemp,
                                        onAction,
                                    }: PromiseCardProps) {
    return (
        <div className="w-full rounded-3xl border-[0.8px] border-border-point bg-cardWeak px-6 py-5 shadow-[0_4px_20px_0_rgba(36,21,14,0.08)]">
            {/* 상단: 라벨 + 메타정보 (space-between) */}
            <div className="flex items-center justify-between">
        <span className="text-[10px] font-extrabold uppercase leading-[15px] tracking-[1px] text-orange">
          진짜보자 카드
        </span>
                {roomLabel && (
                    <span className="text-[10px] font-normal leading-[15px] text-muted">
            {roomLabel}
          </span>
                )}
            </div>

            {/* 마지막 만남 (위 20) */}
            {caption && (
                <p className="mt-5 text-xs font-medium leading-4 text-muted">
                    {caption}
                </p>
            )}

            {/* 큰 제목 */}
            <h2 className="mt-1 whitespace-pre-line text-base font-bold leading-[22px] text-text">
                {title}
            </h2>

            {/* 부가 설명 */}
            {description && (
                <p className="mt-2 whitespace-pre-line text-sm font-normal leading-5 text-text">
                    {description}
                </p>
            )}

            {/* 온도 박스 (위 20) - 흰 박스 */}
            {initialTemp !== undefined && (
                <div className="mt-5 flex items-center gap-2 rounded-2xl bg-card px-4 py-3">
                    <Thermometer size={16} className="text-orange" />
                    <span className="flex-1 text-sm font-medium leading-5 text-text">
            약속 온도 초기값
          </span>
                    <span className="text-lg font-bold leading-7 text-orange">
            {initialTemp}℃
          </span>
                </div>
            )}

            {/* 버튼 (위 20) */}
            <button
                onClick={onAction}
                className="mt-5 flex w-full flex-col items-center rounded-2xl bg-orange py-3 text-base font-bold text-white shadow-[0_3px_10px_0_rgba(233,120,47,0.28)] transition hover:bg-orange-dark active:bg-orange-dark"
            >
                진짜 볼 사람?
            </button>
        </div>
    );
}