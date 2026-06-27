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
    <div className="min-h-dvh flex">
      {/* 브랜드 패널 — 데스크탑만 */}
      <div className="hidden md:flex md:w-[400px] md:shrink-0 flex-col justify-between bg-orange px-12 py-16">
        <div />
        <div>
          <p className="text-[52px] font-black text-white leading-tight">
            진짜보자
            <br />
            👀
          </p>
          <p className="mt-6 text-sm leading-7 text-white/75">
            친구들과 진짜로 만날 수 있게
            <br />
            일정을 가볍게 조율해요.
          </p>
        </div>
        <p className="text-[11px] text-white/40">© 2026 MESHUP 진짜보자</p>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex-1 flex flex-col bg-[#1a1a1a] md:bg-bg md:items-center md:justify-center md:overflow-hidden">
        {/* 모바일: 풀스크린 / 데스크탑: 430px 패널 */}
        <div
          className="
            w-full max-w-[430px] flex flex-col bg-bg
            min-h-dvh
            md:min-h-0 md:h-screen md:border-x md:border-border
          "
        >
          {topBar && <header className="shrink-0">{topBar}</header>}

          <main className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 pb-32">
            {children}
          </main>

          {bottomCTA && (
            <>
              {/* 모바일: 뷰포트 기준 fixed */}
              <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[390px] md:hidden">
                {bottomCTA}
              </div>
              {/* 데스크탑: 패널 하단 고정 */}
              <div className="hidden md:block shrink-0 px-5 pb-6 pt-3 bg-bg border-t border-border">
                {bottomCTA}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
