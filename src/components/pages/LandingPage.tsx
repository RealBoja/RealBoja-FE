// src/pages/LandingPage.tsx
import MobileLayout from "../layout/MobileLayout";
import Badge from "../common/Badge";
import Button from "../common/Button";
import { ChevronRight } from "../common/icons";

const steps = [
  {
    num: "01",
    icon: "🏠",
    title: "방을 고르고",
    desc: "깨우고 싶은 단톡방 유형을 선택해요",
    bg: "#FFF3E0",
  },
  {
    num: "02",
    icon: "✨",
    title: "AI 카드 만들고",
    desc: "방 분위기에 맞는 카드들 자동 생성",
    bg: "#FFF8EC",
  },
  {
    num: "03",
    icon: "💬",
    title: "친구들이 반응하고",
    desc: "참여자들이 가볍게 의사를 표현해요",
    bg: "#F0F9FF",
  },
  {
    num: "04",
    icon: "🎯",
    title: "결과 카드로 다음 행동까지",
    desc: "약속 온도에 따라 다음 단계를 안내",
    bg: "#FFF1E3",
  },
];

export default function LandingPage() {
  const handleStart = () => {
    // TODO: 방 깨우기 플로우 시작
  };

  return (
    <MobileLayout
      //topBar={<TopBar showBack={false} />}
      bottomCTA={
        <Button variant="primary" onClick={handleStart}>
          방 깨우기 시작 →
        </Button>
      }
    >
      {/* 서비스 뱃지 */}
      <div>
        <Badge variant="primary">✦ AI 약속 재점화 서비스</Badge>
      </div>

      {/* 헤드라인 섹션 */}
      <div className="flex flex-col items-start gap-4 mb-6">
        <h1 className="flex items-center gap-2 pt-5 font-brand font-extrabold text-[28px] leading-tight text-text">
          진짜보자 👀
        </h1>
        <h2 className="text-h1 text-text">
          깨우고 싶은
          <br />
          방이 있나요?
        </h2>
      </div>

      {/* 설명 텍스트 */}
      <p className="text-body text-muted mb-6">
        '나중에 보자'로 멈춘 단톡방에
        <br />
        AI 약속 카드를 던져보세요.
      </p>

      {/* 강조 칩 */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-orange-light border border-border-point/60 text-caption font-semibold text-orange">
          ✦ 날짜를 맞추기 전에, 먼저 방을 깨웁니다.
        </span>
      </div>

      {/* 스텝 카드 리스트 */}
      <div className="flex flex-col gap-3">
        {steps.map((step) => (
          <button
            key={step.num}
            onClick={handleStart}
            className="w-full text-left bg-card border border-border rounded-2xl p-4 hover:border-border-point hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ backgroundColor: step.bg }}
              >
                {step.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="text-label text-muted">{step.num}</span>
                  <span className="text-body-lg font-bold text-text">
                    {step.title}
                  </span>
                </div>
                <p className="text-caption text-muted truncate">{step.desc}</p>
              </div>

              <ChevronRight size={16} className="text-muted flex-shrink-0" />
            </div>
          </button>
        ))}
      </div>

      {/* 바닥 텍스트 */}
      <p className="text-caption text-muted text-center mt-8 mb-2">
        지금 이 순간에도 조용한 방이 있을지도 🥲
      </p>
    </MobileLayout>
  );
}
