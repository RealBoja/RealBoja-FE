// src/api/analysisApi.ts
import api from "./axiosInstance";

// 반응 타입 (백엔드 enum)
export type ReactionType =
  | "REALLY_MEET"
  | "PURPOSE_OK"
  | "IF_SOMEONE_LEADS"
  | "JUST_ALIVE";

// GET /api/rooms/{roomCode}/analysis 응답의 data 부분
export interface AnalysisData {
  temperature: number;
  statusType: string; // "COLD_ROOM" 등
  statusLabel: string; // "냉동방형"
  participantCount: number; // 반응한 사람 수
  roomSize: number; // 전체 인원
  participationRate: number; // 0.13
  reactionSummary: Record<ReactionType, number>; // { REALLY_MEET: 1, ... }
  reactionParticipants: Record<ReactionType, string[]>; // { REALLY_MEET: ["수현"], ... }
  summary: string; // "아직 반응이 부족해요."
  nextAction: string; // "먼저 생존신고를 받아보세요."
}

export interface AnalysisResponse {
  success: boolean;
  data: AnalysisData;
  message: string | null;
}

/** GET /api/rooms/{roomCode}/analysis — 방 분석(온도/반응) 조회 */
export async function getAnalysis(roomCode: string): Promise<AnalysisData> {
  const { data } = await api.get<AnalysisResponse>(
    `/api/rooms/${roomCode}/analysis`,
  );
  return data.data;
}

// ── 시간대 결과 조회 ───────────────────────────────────

export interface TimeSlotResult {
  timeSlot: string;
  label: string;
  count: number;
  nicknames: string[];
}

export interface PlaceRecommendationGuide {
  status: string;
  title: string;
  description: string;
}

export interface PlaceRecommendation {
  area: string;
  reason: string;
  hashtags: string[];
}

export interface ScheduleData {
  participantCount: number;
  topTimeSlot: TimeSlotResult;
  results: TimeSlotResult[];
  placeRecommendationGuide: PlaceRecommendationGuide;
  placeRecommendations: PlaceRecommendation[];
}

interface ScheduleResponse {
  success: boolean;
  data: ScheduleData;
  message: string | null;
}

/** GET /api/rooms/{roomCode}/schedule — 시간대 결과 조회 */
export async function getSchedule(roomCode: string): Promise<ScheduleData> {
  const { data } = await api.get<ScheduleResponse>(
    `/api/rooms/${roomCode}/schedule`,
  );
  return data.data;
}
