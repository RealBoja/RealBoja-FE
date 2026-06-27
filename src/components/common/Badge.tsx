// 뱃지 컴포넌트의 props 타입 정의
interface BadgeProps {
  variant?: "primary" | "soft" | "mono"; // 뱃지 종류
  children: React.ReactNode;
}

// 종류별 스타일 모음 (Button.tsx의 variants 패턴과 동일하게 작성)
const variants = {
  // Primary: 진한 주황 배경 + 흰 글씨 (예: "공유된 약속방", "72℃")
  primary: "bg-orange text-white rounded-full text-xs font-bold",

  // Soft: 연한 주황 배경 + 진한 주황 글씨 + 테두리 (예: "✦ AI 약속 재점화 서비스")
  soft: "bg-orange-light text-orange-dark border border-border rounded-full text-xs font-bold",

  // Mono: 회색 배경 + 고정폭 폰트 (예: "/r/:roomCode" 같은 코드/경로 표시)
  mono: "bg-mono-bg text-muted font-mono rounded-full text-xs",
};

export default function Badge({ variant = "primary", children }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center
        px-4 py-2
        ${variants[variant]}
      `}
    >
      {children}
    </span>
  );
}
