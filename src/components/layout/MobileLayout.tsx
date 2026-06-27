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
        <div className="relative mx-auto flex min-h-dvh w-full max-w-107.5 flex-col bg-bg">
            {/* TopBar - 44px 고정 */}
            {topBar && (
                <header className="flex h-11 shrink-0 items-center px-5">
                    {topBar}
                </header>
            )}

            {/* Content Area - 스크롤. 하단 버튼에 안 가리게 아래 여백 줌 */}
            <main className="flex-1 overflow-y-auto px-5 py-4 pb-32">
                {children}
            </main>

            {/* Bottom CTA - 화면 하단에 고정 (fixed) */}
            {bottomCTA && (
                <div className="fixed bottom-5 left-0 right-0 mx-auto w-full max-w-107.5 px-5">
                    {bottomCTA}
                </div>
            )}
        </div>
    );
}