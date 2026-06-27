import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MobileLayout from "@/components/layout/MobileLayout";
import TopBar from "@/components/common/TopBar";
import PromiseCard from "@/components/common/PromiseCard";
import ShareButton from "@/components/common/ShareButton";
import { createCard, getRoomDetail, PURPOSE_LABEL_MAP } from "@/api/roomApi";

const ROOM_TYPE_LABEL_MAP: Record<string, string> = {
  HIGH_SCHOOL: "고등학교 친구방",
  UNIVERSITY: "대학교 동기방",
  CLUB: "동아리/모임방",
  EX_COWORKER: "전 직장 동료방",
  PROJECT_TEAM: "프로젝트 끝난 팀방",
  FAMILY: "가족/친척방",
  OTHER: "기타",
};

export default function CardResultPage() {
  const navigate = useNavigate();
  const { roomCode } = useParams<{ roomCode: string }>();

  const [badge, setBadge] = useState("");
  const [body, setBody] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [roomLabel, setRoomLabel] = useState("");
  const [hint, setHint] = useState("");
  const [tone, setTone] = useState("");

  useEffect(() => {
    if (!roomCode) return;

    Promise.all([createCard(roomCode), getRoomDetail(roomCode)])
      .then(([cardRes, roomRes]) => {
        const { title, body, ctaText } = cardRes.data;
        setBadge(title);
        setBody(body.replace(/\\n/g, "\n"));
        setCtaText(ctaText);

        const { roomType, purpose, roomSize, tone } = roomRes.data;
        setRoomLabel(
          `${ROOM_TYPE_LABEL_MAP[roomType] ?? ""} · ${PURPOSE_LABEL_MAP[purpose] ?? ""}`,
        );
        setTone(tone);

        const survivorCount = Math.floor(roomSize / 2) + 1;
        setHint(`방 해동 조건: 생존자 ${survivorCount}명`);
      })
      .catch((e) => {
        console.error(e);
        alert("카드를 불러오지 못했어요.");
      });
  }, [roomCode]);

  const handleShare = () => {
    const link = `${window.location.origin}/${roomCode}/card-result`;
    navigator.clipboard.writeText(link);
    alert("링크가 복사됐어요!");
  };

  const handleJoinPage = () => {
    navigate(`/card/${roomCode}/join`);
  };

  return (
    <MobileLayout
      topBar={<TopBar showBack onBack={() => navigate(-1)} />}
      bottomCTA={
        <div className="flex flex-col gap-3">
          <ShareButton onClick={handleShare}>카드 공유하기</ShareButton>
          <button
            onClick={() => navigate("/create")}
            className="w-full rounded-2xl border-[0.8px] border-border bg-bg py-3 text-sm font-medium leading-5 text-muted transition hover:bg-section active:bg-cardWeak"
          >
            다시 만들기
          </button>
        </div>
      }
    >
      <h1 className="text-xl font-bold leading-7 text-text">
        약속 카드가 완성됐어요
      </h1>
      <p className="mt-1 text-sm font-normal leading-5 text-muted">
        카드를 단톡방에 공유하면 친구들이 가볍게 반응할 수 있어요.
      </p>

      <div className="flex min-h-[60vh] items-center">
        <PromiseCard
          cardLabel="진짜보자 약속카드"
          roomLabel={roomLabel}
          badge={badge}
          description={body}
          hint={hint}
          ctaText={ctaText}
          tone={tone}
          onAction={handleJoinPage}
        />
      </div>
    </MobileLayout>
  );
}
