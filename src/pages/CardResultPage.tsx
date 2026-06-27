import MobileLayout from "@/components/layout/MobileLayout";
import TopBar from "@/components/common/TopBar";
import PromiseCard from "@/components/common/PromiseCard";
import ShareButton from "@/components/common/ShareButton";

export default function CardResultPage() {
    return (
        <MobileLayout
            topBar={<TopBar showBack onBack={() => history.back()} />}
            bottomCTA={
                <div className="flex flex-col gap-3">
                    {/* 카톡방에 공유하기 (ShareButton 컴포넌트) */}
                    <ShareButton onClick={() => {}}>카톡방에 공유하기</ShareButton>

                    {/* 다시 만들기 */}
                    <button
                        onClick={() => {}}
                        className="w-full rounded-2xl border-[0.8px] border-border bg-bg py-3 text-sm font-medium leading-5 text-muted transition hover:bg-section active:bg-cardWeak"
                    >
                        다시 만들기
                    </button>
                </div>
            }
        >
            {/* 제목 영역 */}
            <h1 className="text-xl font-bold leading-7 text-text">
                약속 카드가 완성됐어요
            </h1>
            <p className="mt-1 text-sm font-normal leading-5 text-muted">
                카드를 단톡방에 공유하면 친구들이 가볍게 반응할 수 있어요.
            </p>

            {/* 진짜보자 카드 - 남은 공간 세로 중앙 */}
            <div className="flex min-h-[60vh] items-center">
                <PromiseCard
                    cardLabel="진짜보자 약속카드"
                    roomLabel="고등학교 친구방 · 밥"
                    badge="이 방 마지막 만남: 거의 전설"
                    title={'"나중에 보자"만 반복 중'}
                    description={"날짜를 정하기 전에,\n먼저 만날 마음부터 확인해볼게요."}
                    hint="생존자 3명부터 약속 온도 상승"
                    onAction={() => {}}
                />
            </div>
        </MobileLayout>
    );
}