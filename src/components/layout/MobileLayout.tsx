interface MobileLayoutProps {
    topBar?: React.ReactNode;     // 상단 바 (로고 등)
    bottomCTA?: React.ReactNode;  // 하단 고정 버튼
    children: React.ReactNode;    // 스크롤되는 본문
}

export default function MobileLayout({
                                         topBar,
                                         bottomCTA,
                                         children,
                                     }: MobileLayoutProps) {
    return (
        // 화면 전체: 가운데 정렬 + 최대 너비 430px 제한
        <div className="mx-auto flex min-h-[100dvh] w-full max-w-[430px] flex-col bg-bg">
            {/* TopBar - 44px 고정 */}
            {topBar && (
                <header className="flex h-11 shrink-0 items-center px-5">
                    {topBar}
                </header>
            )}

            {/* Content Area - 남는 공간 다 차지 + 스크롤 */}
            <main className="flex-1 overflow-y-auto px-5 py-4">
                {children}
            </main>

            {/* Bottom CTA - 하단 고정 버튼 영역 */}
            {bottomCTA && (
                <footer className="shrink-0 px-5 pb-8 pt-3">
                    {bottomCTA}
                </footer>
            )}
        </div>
    );
}