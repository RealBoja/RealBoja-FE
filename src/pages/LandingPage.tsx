import MobileLayout from "../components/layout/MobileLayout";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    num: "01",
    icon: "🏠",
    title: "방을 고르고",
    desc: "깨우고 싶은 단톡방 유형을 선택해요",
  },
  {
    num: "02",
    icon: "✨",
    title: "AI 카드 만들고",
    desc: "방 분위기에 맞는 카드를 자동 생성",
  },
  {
    num: "03",
    icon: "💬",
    title: "친구들이 반응하고",
    desc: "참여자들이 가볍게 의사를 표현해요",
  },
  {
    num: "04",
    icon: "🎯",
    title: "결과 카드로 다음 행동까지",
    desc: "약속 온도에 따라 다음 단계를 안내",
  },
];

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M2.91675 7H11.0834"
      stroke="#E9782F"
      strokeWidth="1.16667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 2.91669L11.0833 7.00002L7 11.0834"
      stroke="#E9782F"
      strokeWidth="1.16667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function LandingPage() {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate("/create");
  };

  return (
    <MobileLayout
      bottomCTA={
        <Button variant="primary" onClick={handleStart}>
          방 깨우기 시작 →
        </Button>
      }
    >
      {/* 상단 섹션: px-6 pt-7 pb-4 */}
      <div className="px-6 pt-7 pb-4">
        {/* 뱃지 */}
        <div className="h-6 relative mb-0">
          <div className="inline-flex items-center h-7 px-3 rounded-full bg-[#e9782f]">
            <p className="text-[11px] font-bold text-white">
              ✦ AI 약속 재점화 서비스
            </p>
          </div>
        </div>

        {/* 진짜보자 👀 */}
        <div className="flex items-center gap-2 pt-5 h-[62px]">
          <p className="text-[28px] font-bold text-text">진짜보자</p>
          <p className="text-2xl text-text">👀</p>
        </div>

        {/* 깨우고 싶은 방이 있나요? + 데코 이모지 */}
        <div className="relative pt-4 h-[81px] w-full">
          <p className="text-[26px] font-bold text-text leading-tight">
            깨우고 싶은
            <br />
            방이 있나요?
          </p>
          <span className="absolute right-[38px] top-1 text-base opacity-60">
            🔥
          </span>
          <span className="absolute right-[23px] top-10 text-sm opacity-50">
            💬
          </span>
          <span className="absolute right-[49px] top-[69px] text-xs opacity-40">
            🌡️
          </span>
        </div>

        {/* 설명 텍스트 */}
        <div className="pt-2 pb-3">
          <p className="text-sm text-[#7b6658]">
            '나중에 보자'로 멈춘 단톡방에
            <br />
            AI 약속 카드를 던져보세요.
          </p>
        </div>

        {/* 강조 칩 */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fff1e3] border-[0.8px] border-[#eedccb] w-fit">
          <p className="text-xs font-bold text-[#d85f1f]">✦</p>
          <p className="text-xs font-bold text-[#d85f1f]">
            날짜를 맞추기 전에, 먼저 방을 깨웁니다.
          </p>
        </div>
      </div>

      {/* 스텝 카드 섹션: px-5 pb-5 */}
      <div className="px-5 pb-5">
        {steps.map((step, i) => (
          <div key={step.num} className={i !== 0 ? "pt-3" : ""}>
            <button
              onClick={handleStart}
              className="group flex items-center w-full gap-4 p-4 rounded-2xl bg-white border-[0.8px] border-[#eedccb] text-left cursor-pointer hover:border-[#f0be83] transition-all duration-200"
              style={{ boxShadow: "0px 2px 10px 0 rgba(233,120,47,0.08)" }}
            >
              {/* 아이콘 */}
              <div className="flex items-center justify-center w-10 h-10 rounded-[14px] bg-[#fff1e3] flex-shrink-0">
                <p className="text-xl">{step.icon}</p>
              </div>

              {/* 텍스트 */}
              <div className="flex flex-col items-start flex-grow">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-bold text-[#e9782f]">
                    {step.num}
                  </p>
                  <p className="text-sm font-bold text-[#24150e]">
                    {step.title}
                  </p>
                </div>
                <div className="pt-0.5">
                  <p className="text-xs text-[#7b6658]">{step.desc}</p>
                </div>
              </div>

              {/* 화살표 - hover 시 오른쪽으로 바운스 */}
              <ArrowIcon className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1.5" />
            </button>
          </div>
        ))}
      </div>

      {/* 바닥 텍스트 */}
      <p className="text-[11px] text-center text-[#7b6658] pb-2">
        지금 이 순간에도 조용한 방이 있을지도 🤫
      </p>
    </MobileLayout>
  );
}
