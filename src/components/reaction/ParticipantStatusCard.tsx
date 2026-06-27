// src/components/reaction/ParticipantStatusCard.tsx
interface ParticipantStatusCardProps {
  nickname: string;
  roomMeta: string;
  temp: number;
  reactionCount: number;
  totalCount: number;
}

export default function ParticipantStatusCard({
  nickname,
  roomMeta,
  temp,
  reactionCount,
  totalCount,
}: ParticipantStatusCardProps) {
  return (
    <div className="self-stretch p-4 rounded-2xl bg-card border-[0.8px] border-[#eedccb]">
      {/* 상단: 참여자 정보 + 입장 완료 뱃지 */}
      <div className="flex justify-between items-start self-stretch">
        <div>
          <p className="text-xs font-bold text-text">
            {nickname} 님으로 참여 중
          </p>
          <p className="text-[10px] text-muted">{roomMeta}</p>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-orange">
          <p className="text-[10px] font-bold text-white">입장 완료</p>
        </div>
      </div>

      {/* 하단: 온도 + 반응수 */}
      <div className="flex gap-2 pt-3 h-[73.6px]">
        <div className="flex-1 flex flex-col p-2.5 rounded-[14px] bg-[#fffcf6] border-[0.8px] border-[#eedccb]">
          <p className="text-[9px] text-center text-muted">약속 온도</p>
          <div className="flex justify-center items-center pt-0.5 h-[26px]">
            <p className="text-base font-black text-amber-400">{temp}℃</p>
          </div>
        </div>
        <div className="flex-1 flex flex-col p-2.5 rounded-[14px] bg-[#fffcf6] border-[0.8px] border-[#eedccb]">
          <p className="text-[9px] text-center text-muted">현재 반응</p>
          <div className="flex justify-center items-center pt-0.5 h-[26px]">
            <span className="text-base font-black text-text">
              {reactionCount}
            </span>
            <span className="text-xs text-muted">/{totalCount}명</span>
          </div>
        </div>
      </div>
    </div>
  );
}
