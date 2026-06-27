interface MobileLayoutProps {
  topBar?: React.ReactNode;
  bottomCTA?: React.ReactNode;
  children: React.ReactNode;
}

export default function MobileLayout({
  topBar,
  bottomCTA,
  children,
}: MobileLayoutProps) {
  return (
    // 바깥 배경 - PC에서 어두운 배경 + 가운데 정렬
    <div className="min-h-[100dvh] bg-[#1a1a1a] flex justify-center">
      {/* 폰 화면 영역 - 최대 430px */}
      <div className="relative mx-auto w-full max-w-[430px] bg-bg min-h-[100dvh]">
        {topBar && <header className="shrink-0">{topBar}</header>}

        {/* 본문 - 하단 버튼에 안 가려지게 padding-bottom 확보 */}
        <main className={`px-5 py-5 ${bottomCTA ? "pb-24" : ""}`}>
          {children}
        </main>

        {/* 하단 고정 CTA - position: fixed, 20px 여백 */}
        {bottomCTA && (
          <div className="fixed bottom-5 left-5 right-5 mx-auto max-w-[390px]">
            {bottomCTA}
          </div>
        )}
      </div>
    </div>
  );
}
