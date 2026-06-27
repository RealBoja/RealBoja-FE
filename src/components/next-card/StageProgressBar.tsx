// 현재 단계: 조율 가능 | 다음 목표: 가능한 시간대만 좁혀보기
interface StageProgressBarProps {
  currentStage: string;
  nextGoal: string;
}

export default function StageProgressBar({
  currentStage,
  nextGoal,
}: StageProgressBarProps) {
  return (
    <div className="flex justify-between items-center self-stretch px-4 py-3 rounded-[14px] bg-[#fff8ec] border-[0.8px] border-[#eedccb]">
      <div className="flex flex-col items-start">
        <p className="text-[9px] font-bold uppercase text-muted">현재 단계</p>
        <p className="text-sm font-bold text-orange">{currentStage}</p>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-[9px] text-right text-muted">다음 목표</p>
        <p className="text-[10px] font-bold text-right text-text">{nextGoal}</p>
      </div>
    </div>
  );
}
