import { useState } from "react";
import MobileLayout from "../components/layout/MobileLayout";
import TopBar from "../components/common/TopBar";
import Button from "../components/common/Button";

const TIME_OPTIONS = [
    "평일 저녁",
    "토요일 낮",
    "토요일 저녁",
    "일요일 오후",
    "이번 달 안이면 감", // 마지막은 가로 전체
];

interface SecondCardPageProps {
    onBack?: () => void;
    onSubmit?: (selected: string) => void;
}

export default function SecondCardPage({
                                           onSubmit,
                                       }: SecondCardPageProps) {
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <MobileLayout
            topBar={<TopBar />}
            bottomCTA={
                <Button
                    variant="primary"
                    onClick={() => selected && onSubmit?.(selected)}
                >
                    내 시간대 남기기
                </Button>
            }
        >
            {/* 2차 카드 */}
            <div
                className="overflow-hidden rounded-2xl border-[0.8px] border-border-point"
                style={{ boxShadow: "0px 4px 16px 0 rgba(36,21,14,0.08)" }}
            >
                {/* 헤더 */}
                <div className="flex items-center justify-between border-b-[0.8px] border-border-point bg-cardWeak px-4 py-2.5">
          <span className="text-[9px] font-bold uppercase text-orange">
            진짜보자 2차 카드
          </span>
                    <span className="text-[9px] text-muted">고등학교 친구방 · 밥</span>
                </div>
                {/* 본문 */}
                <div className="bg-card px-4 py-3">
                    <p className="text-sm font-bold text-text">이제 시간만 좁혀보자</p>
                    <p className="pt-1 text-xs text-muted">
                        정확한 날짜는 나중에 정하고, 가능한 시간대만 골라주세요.
                    </p>
                </div>
            </div>

            {/* 참여 현황 박스 (위 12) */}
            <div className="mt-3 flex items-center justify-between rounded-[14px] border-[0.8px] border-border bg-section px-4 py-2.5">
        <span className="text-xs font-bold text-text">
          현재 3명이 시간대를 골랐어요
        </span>
                <span className="rounded-full bg-orange px-2 py-0.5 text-[10px] font-bold text-white">
          5명 중
        </span>
            </div>

            {/* 안내 문구 (위 12) */}
            <p className="mt-3 text-[10px] text-muted">
                내 선택을 남기면 시간대 결과를 확인할 수 있어요.
            </p>

            {/* 언제가 덜 부담돼? (위 12) */}
            <div className="mt-3 self-stretch">
                <p className="text-sm font-bold text-text">언제가 덜 부담돼?</p>

                {/* 시간대 선택 (위 8) */}
                <div className="mt-2 grid grid-cols-2 gap-2">
                    {TIME_OPTIONS.map((opt, i) => {
                        const isSelected = selected === opt;
                        const isLast = i === TIME_OPTIONS.length - 1;
                        return (
                            <button
                                key={opt}
                                onClick={() => setSelected(opt)}
                                className={`
                  ${isLast ? "col-span-2" : ""}
                  rounded-[14px] border-[0.8px] py-3 text-center text-sm font-bold transition
                  ${
                                    isSelected
                                        ? "border-orange bg-orange-light text-orange-dark"
                                        : "border-border bg-card text-text hover:bg-section"
                                }
                `}
                            >
                                {opt}
                            </button>
                        );
                    })}
                </div>
            </div>
        </MobileLayout>
    );
}