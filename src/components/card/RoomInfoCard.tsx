import { Thermometer, Users } from "lucide-react";
import Badge from "@/components/common/Badge.tsx";

interface RoomInfoCardProps {
    roomName?: string;     // "고등학교 친구방"
    caption?: string;      // "이 방 마지막 만남: 거의 전설"
    title: string;         // "'나중에 보자'만 반복 중"
    temp?: number;         // 18
    memberCount?: number;  // 8
    purpose?: string;      // "밥"
}

export default function RoomInfoCard({
                                         roomName,
                                         caption,
                                         title,
                                         temp,
                                         memberCount,
                                         purpose,
                                     }: RoomInfoCardProps) {
    return (
        <div className="flex flex-col items-start self-stretch">
            {/* 상단: 뱃지 + 방 이름 */}
            <div className="flex items-center gap-2 self-stretch">
                <Badge variant="primary">공유된 약속방</Badge>
                {roomName && (
                    <span className="text-xs text-muted">{roomName}</span>
                )}
            </div>

            {/* 흰 박스 (위 16) */}
            <div className="mt-4 flex flex-col items-start self-stretch rounded-2xl border-[0.8px] border-border bg-card p-4">
                {/* 마지막 만남 */}
                {caption && (
                    <p className="text-xs text-muted">{caption}</p>
                )}

                {/* 제목 (위 4) */}
                <p className="mt-1 text-sm font-bold text-text">{title}</p>

                {/* 메타 정보: 온도 / 인원 / 목적 (위 8) */}
                <div className="mt-2 flex items-center gap-3">
                    {temp !== undefined && (
                        <div className="flex items-center gap-1">
                            <Thermometer size={11} className="text-orange" />
                            <span className="text-xs text-muted">{temp}℃</span>
                        </div>
                    )}
                    {memberCount !== undefined && (
                        <div className="flex items-center gap-1">
                            <Users size={11} className="text-muted" />
                            <span className="text-xs text-muted">{memberCount}명</span>
                        </div>
                    )}
                    {purpose && (
                        <span className="text-xs text-muted">{purpose}</span>
                    )}
                </div>
            </div>
        </div>
    );
}