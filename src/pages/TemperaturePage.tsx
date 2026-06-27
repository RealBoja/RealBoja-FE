import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MobileLayout from "../components/layout/MobileLayout";
import TopBar from "../components/common/TopBar";
import Button from "../components/common/Button";
import TemperatureGauge from "../components/temperature/TemperatureGauge";
import ReactionStatRow from "../components/temperature/ReactionStatRow";
import TempLegend from "../components/temperature/TempLegend";
import { Users } from "../components/common/icons";
import { getAnalysis, type AnalysisResponse } from "../api/analysisApi";

// 반응 타입 (팀원 roomApi엔 타입이 따로 없어서 여기 정의)
type ReactionType =
  | "REALLY_MEET"
  | "PURPOSE_OK"
  | "IF_SOMEONE_LEADS"
  | "JUST_ALIVE";

// analysis 응답의 data 부분 타입
type AnalysisData = AnalysisResponse["data"];

// 반응 타입별 이모지 (백엔드엔 이모지가 없어서 프론트에서 매핑)
const REACTION_EMOJI: Record<ReactionType, string> = {
  REALLY_MEET: "🔥",
  PURPOSE_OK: "🍚",
  IF_SOMEONE_LEADS: "🙋",
  JUST_ALIVE: "👀",
};

// 반응 타입별 라벨 (백엔드 enum 라벨 기준)
const REACTION_LABEL: Record<ReactionType, string> = {
  REALLY_MEET: "나 진짜 볼래",
  PURPOSE_OK: "목적이면 감",
  IF_SOMEONE_LEADS: "누가 잡으면 감",
  JUST_ALIVE: "일단 생존신고",
};

// 화면에 보여줄 순서
const REACTION_ORDER: ReactionType[] = [
  "REALLY_MEET",
  "PURPOSE_OK",
  "IF_SOMEONE_LEADS",
  "JUST_ALIVE",
];

// 반응 요약 공개 기준 (과반수)
function unlockThreshold(roomSize: number) {
  return Math.floor(roomSize / 2) + 1;
}

export default function TemperaturePage() {
  const { roomCode } = useParams<{ roomCode: string }>();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!roomCode) return;
    let alive = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getAnalysis(roomCode);
        if (alive) setAnalysis(res);
      } catch {
        if (alive) setError("분석 정보를 불러오지 못했어요.");
      } finally {
        if (alive) setLoading(false);
      }
    };

    fetchData();
    return () => {
      alive = false;
    };
  }, [roomCode]);

  // ── 로딩 ──
  if (loading) {
    return (
      <MobileLayout topBar={<TopBar />}>
        <div className="flex h-full items-center justify-center py-20">
          <p className="text-sm text-muted">불러오는 중…</p>
        </div>
      </MobileLayout>
    );
  }

  // ── 에러 ──
  if (error || !analysis) {
    return (
      <MobileLayout topBar={<TopBar />}>
        <div className="flex flex-col items-center justify-center gap-3 py-20">
          <p className="text-sm text-muted">{error ?? "데이터가 없어요."}</p>
        </div>
      </MobileLayout>
    );
  }

  // ── 정상 데이터 ──
  const respondedCount = analysis.participantCount;
  const totalCount = analysis.roomSize;
  const isUnlocked = respondedCount >= unlockThreshold(totalCount);

  // 응답 → 화면용 반응 배열로 변환
  const reactions = REACTION_ORDER.map((type) => ({
    type,
    emoji: REACTION_EMOJI[type],
    label: REACTION_LABEL[type],
    count: analysis.reactionSummary[type] ?? 0,
    names: analysis.reactionParticipants[type] ?? [],
  }));

  return (
    <MobileLayout
      topBar={<TopBar />}
      bottomCTA={
        // 기존 코드에서 navigate 부분만 수정
        isUnlocked ? (
          <Button
            variant="primary"
            onClick={() => navigate(`/card/${roomCode}/analysis`)}
          >
            결과 카드 보기
          </Button>
        ) : (
          <Button
            variant="ghost"
            onClick={() => navigate(`/card/${roomCode}/react`)}
          >
            반응 남기기
          </Button>
        )
      }
    >
      {/* 온도 게이지 */}
      <div className="pb-4">
        <TemperatureGauge
          temp={analysis.temperature}
          message={analysis.summary}
        />
      </div>

      {/* 참여 현황 */}
      <div className="pb-4">
        <div className="flex items-center self-stretch gap-3 px-5 py-4 rounded-2xl bg-section border-[0.8px] border-border">
          <Users size={20} className="text-orange" />
          <div className="flex flex-col w-[220px]">
            <p className="text-sm font-bold text-text">
              방 인원 {totalCount}명 중 {respondedCount}명이 반응했어요
            </p>
            <div className="flex gap-1 pt-1.5">
              {Array.from({ length: totalCount }).map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-2 rounded-full ${
                    i < respondedCount ? "bg-orange" : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 반응 요약 (과반수 전까진 블러) */}
      <div className="pb-4">
        <p className="text-sm font-bold text-text pb-2">반응 요약</p>

        <div className="relative">
          <div
            className={`flex flex-col gap-2 ${
              !isUnlocked ? "blur-md select-none pointer-events-none" : ""
            }`}
          >
            {reactions.map((r) => (
              <ReactionStatRow
                key={r.type}
                emoji={r.emoji}
                label={r.label}
                count={r.count}
                names={r.names}
              />
            ))}
          </div>

          {!isUnlocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
              <p>🔒</p>
              <p className="text-xs font-bold text-text">
                반응이 더 모이면 공개돼요
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 온도 기준 */}
      <div className="pb-4">
        <TempLegend />
      </div>
    </MobileLayout>
  );
}
