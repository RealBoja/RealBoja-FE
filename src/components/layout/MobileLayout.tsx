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
    <div className="min-h-dvh bg-[#1a1a1a] flex justify-center">
      {/* 화면 영역 - 최대 430px */}
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-bg">
        {/* TopBar */}
        {topBar && <header className="shrink-0">{topBar}</header>}

        {/* Content Area - 스크롤, 하단 버튼에 안 가리게 여백 확보 */}
        <main className="flex-1 overflow-y-auto px-5 py-4 pb-32">
          {children}
        </main>

        {/* Bottom CTA - 화면 하단 고정 */}
        {bottomCTA && (
          <div className="fixed bottom-5 left-5 right-5 mx-auto max-w-[390px]">
            {bottomCTA}
          </div>
        )}
      </div>
    </div>
  );
}
