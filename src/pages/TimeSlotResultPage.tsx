import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toPng } from "html-to-image";
import MobileLayout from "../components/layout/MobileLayout";
import TopBar from "../components/common/TopBar";
import ShareButton from "../components/common/ShareButton";
import {
  getSchedule,
  type ScheduleData,
  type PlaceRecommendation,
} from "@/api/analysisApi";

export default function TimeSlotResultPage() {
  const { roomCode } = useParams<{ roomCode: string }>();
  const navigate = useNavigate();

  const cardRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ScheduleData | null>(null);

  useEffect(() => {
    if (!roomCode) return;

    getSchedule(roomCode)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [roomCode]);

  const handleShare = async () => {
    const nickname = localStorage.getItem("nickname");
    const savedRoomCode = localStorage.getItem("roomCode");
    if (!nickname || savedRoomCode !== roomCode) {
      navigate(`/card/${roomCode}/join`);
      return;
    }

    const shareUrl = `${window.location.origin}/card/${roomCode}/timeslot`;

    if (!cardRef.current) {
      await navigator.clipboard.writeText(shareUrl);
      alert("링크가 복사됐어요!");
      return;
    }

    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "realboja-timeslot.png", { type: "image/png" });

      await navigator.clipboard.writeText(shareUrl);

      if (navigator.share) {
        try {
          await navigator.share({
            title: "진짜보자 일정 결과",
            text: "시간대와 장소 후보가 모였어요 🔥",
            url: shareUrl,
            files: [file],
          });
        } catch {
          await navigator.share({ title: "진짜보자 일정 결과", url: shareUrl });
        }
      } else {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "realboja-timeslot.png";
        a.click();
        await navigator.clipboard.writeText(shareUrl);
        alert("카드 이미지를 저장했어요! 링크도 복사됐어요 😊");
      }
    } catch (e) {
      console.error(e);
      await navigator.clipboard.writeText(shareUrl);
      alert("링크가 복사됐어요!");
    }
  };

  const topCount = data?.topTimeSlot?.count ?? 0;
  // topTimeSlot과 count가 같은 슬롯 전부 (동률)
  const topSlots = data?.topTimeSlot
    ? data.results.filter((r) => r.count === topCount)
    : [];
  // 그보다 낮은 count, count > 0인 나머지 전부
  const otherSlots = data?.topTimeSlot
    ? data.results.filter((r) => r.count > 0 && r.count < topCount)
    : [];

  return (
    <MobileLayout
      topBar={<TopBar showBack onBack={() => navigate(-1)} />}
      bottomCTA={<ShareButton onClick={handleShare}>결과 카드 공유하기</ShareButton>}
    >
      {loading || !data ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-sm text-muted">불러오는 중...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {/* 페이지 제목 */}
          <div>
            <p className="text-xl font-bold text-text">
              시간대와 장소 후보가 모였어요
            </p>
            <p className="pt-0.5 text-xs text-muted">
              친구들의 시간대와 출발역을 모아 만나기 편한 후보를 정리했어요.
            </p>
          </div>

          {/* 메인 결과 카드 */}
          <div ref={cardRef}
            className="flex flex-col gap-2.5 p-4 rounded-3xl bg-cardWeak border-[0.8px] border-border-point"
            style={{ boxShadow: "0px 4px 20px 0 rgba(36,21,14,0.08)" }}
          >
            <p className="text-[9px] font-bold uppercase text-muted">
              진짜보자 일정 결과
            </p>

            {/* 진짜 볼 각 배지 */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange w-fit">
              <p className="text-sm font-bold text-white">진짜 볼 각 🔥</p>
            </div>

            {/* 최다 시간대 카드 */}
            <div className="flex flex-col p-3 rounded-2xl bg-card border-[0.8px] border-border">
              <p className="text-[9px] font-bold uppercase text-orange">
                가장 많이 나온 시간대
              </p>
              {topSlots.length === 0 ? (
                <p className="text-sm text-muted pt-2">
                  아직 시간대를 선택한 친구가 없어요.
                </p>
              ) : (
                <div className="flex flex-col divide-y divide-border">
                  {topSlots.map((slot) => (
                    <div key={slot.timeSlot} className="pt-2 first:pt-1 pb-2 last:pb-0">
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-black text-text">{slot.label}</p>
                        <span className="px-2 py-0.5 rounded-full bg-orange">
                          <p className="text-[10px] font-bold text-white">최다 선택</p>
                        </span>
                      </div>
                      <p className="text-xs text-muted pt-0.5">
                        {data.participantCount}명 중 {slot.count}명 선택
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1.5">
                        {slot.nicknames.map((name) => (
                          <span
                            key={name}
                            className="px-2 py-0.5 rounded-full bg-orange-light border-[0.8px] border-border-point text-[10px] font-medium text-orange-dark"
                          >
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 기타 시간대 2개 나란히 */}
            {otherSlots.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {otherSlots.map((slot) => (
                  <div
                    key={slot.timeSlot}
                    className="flex flex-col p-2.5 rounded-[14px] bg-bg border-[0.8px] border-border"
                  >
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-bold text-muted">
                        {slot.label}
                      </p>
                      <p className="text-[10px] font-bold text-orange">
                        {slot.count}명
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-1.5">
                      {slot.nicknames.map((name) => (
                        <span
                          key={name}
                          className="px-2 py-0.5 rounded-full bg-orange-light border-[0.8px] border-border-point text-[10px] font-medium text-orange-dark"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* AI 추천 장소 섹션 */}
            {data.placeRecommendations.length > 0 && (
              <div className="flex flex-col p-3 rounded-2xl bg-card border-[0.8px] border-border">
                <div className="flex items-center gap-2">
                  <p className="text-[9px] font-bold uppercase text-orange">
                    AI 추천 만남 후보
                  </p>
                  <span className="px-1.5 py-0.5 rounded-full bg-orange-light">
                    <p className="text-[9px] text-orange-dark">출발역 기준</p>
                  </span>
                </div>
                <p className="text-[10px] text-muted pt-1">
                  출발역, 이동 편의성, 만남 목적을 참고해 추천했어요.
                </p>

                <div className="flex flex-col gap-2 pt-2.5">
                  {data.placeRecommendations.map(
                    (place: PlaceRecommendation, i: number) => (
                      <PlaceCard key={place.area} place={place} isTop={i === 0} />
                    ),
                  )}
                </div>
              </div>
            )}

            {/* 요약 박스 */}
            <div className="flex flex-col px-4 py-3 rounded-[14px] bg-orange">
              <p className="text-xs font-bold text-white">
                {data.placeRecommendationGuide.title}
              </p>
              <p className="text-[10px] text-white/80 pt-1">
                {data.placeRecommendationGuide.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </MobileLayout>
  );
}

function PlaceCard({
  place,
  isTop,
}: {
  place: PlaceRecommendation;
  isTop: boolean;
}) {
  return (
    <div
      className={`flex flex-col p-3 rounded-[14px] border-[0.8px] ${
        isTop
          ? "bg-orange-light border-border-point"
          : "bg-bg border-border"
      }`}
    >
      <div className="flex justify-between items-center">
        <p className="text-sm font-bold text-text">{place.area}</p>
        <span
          className={`px-2 py-0.5 rounded-full ${
            isTop ? "bg-orange" : "bg-border"
          }`}
        >
          <p
            className={`text-[9px] font-bold ${
              isTop ? "text-white" : "text-muted"
            }`}
          >
            {isTop ? "추천 1순위" : "후보"}
          </p>
        </span>
      </div>
      <p className="text-[10px] text-muted pt-1">{place.reason}</p>
      <div className="flex flex-wrap gap-1 pt-1.5">
        {place.hashtags.map((tag) => (
          <span
            key={tag}
            className="px-1.5 py-0.5 rounded-full bg-card border-[0.8px] border-border"
          >
            <p className="text-[9px] text-muted">{tag}</p>
          </span>
        ))}
      </div>
    </div>
  );
}
