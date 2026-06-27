// src/api/roomApi.ts
import axios from "axios";

const BASE_URL = "http://10.210.97.99:8080";

const ROOM_TYPE_MAP: Record<string, string> = {
  "고등학교 친구방": "HIGH_SCHOOL",
  "대학교 동기방": "UNIVERSITY",
  "동아리/모임방": "CLUB",
  "전 직장 동료방": "EX_COWORKER",
  "프로젝트 끝난 팀방": "PROJECT_TEAM",
  "가족/친척방": "FAMILY",
  기타: "OTHER",
};

export const ROOM_TYPE_LABEL: Record<string, string> = {
  HIGH_SCHOOL: "고등학교 친구방",
  UNIVERSITY: "대학교 동기방",
  CLUB: "동아리/모임방",
  EX_COWORKER: "전 직장 동료방",
  PROJECT_TEAM: "프로젝트 끝난 팀방",
  FAMILY: "가족/친척방",
  OTHER: "기타",
};

const LAST_MEETING_MAP: Record<string, string> = {
  "1달전": "ONE_MONTH",
  반년전: "HALF_YEAR",
  "1년 넘음": "OVER_ONE_YEAR",
  "기억 안남": "UNKNOWN",
};

const PURPOSE_MAP: Record<string, string> = {
  밥: "MEAL",
  카페: "CAFE",
  술: "DRINK",
  "그냥 얼굴 보기": "JUST_SEE",
};

export const PURPOSE_LABEL: Record<string, string> = {
  MEAL: "밥",
  CAFE: "카페",
  DRINK: "술",
  JUST_SEE: "그냥 얼굴 보기",
};

const TONE_MAP: Record<string, string> = {
  담백하게: "PLAIN",
  웃기게: "FUNNY",
  킹받게: "ANNOYING",
  감성적으로: "EMOTIONAL",
};

export const REACTION_ID_TO_TYPE: Record<string, string> = {
  fire: "REALLY_MEET",
  rice: "PURPOSE_OK",
  grab: "IF_SOMEONE_LEADS",
  eyes: "JUST_ALIVE",
};

// ── 인터페이스 ──────────────────────────────────────

interface CreateRoomRequest {
  roomType: string;
  lastMeeting: string;
  roomSize: number;
  purpose: string;
  tone: string;
}

interface CreateRoomResponse {
  success: boolean;
  data: { roomCode: string; [key: string]: unknown };
  message: string;
}

interface CreateCardResponse {
  success: boolean;
  data: {
    cardId: number;
    roomId: number;
    cardType: string;
    title: string;
    body: string;
    ctaText: string;
  };
  message: string;
}

interface CreateParticipantRequest {
  nickname: string;
}

interface CreateParticipantResponse {
  success: boolean;
  data: {
    participantId: number;
    roomCode: string;
    nickname: string;
    currentStep: "WARMING" | "SCHEDULING";
  };
  message: string | null;
}

interface CreateReactionRequest {
  participantId: number;
  reactionType: string;
}

interface CreateReactionResponse {
  success: boolean;
  data: unknown;
  message: string | null;
}

export interface RoomDetailResponse {
  success: boolean;
  data: {
    roomId: number;
    roomCode: string;
    roomType: string;
    lastMeeting: string;
    roomSize: number;
    purpose: string;
    tone: string;
    currentStep: string;
    createdAt: string;
  };
  message: string;
}

interface AnalysisResponse {
  success: boolean;
  data: {
    temperature: number;
    statusType: string;
    statusLabel: string;
    participantCount: number;
    roomSize: number;
    participationRate: number;
    reactionSummary: Record<string, number>;
    reactionParticipants: Record<string, string[]>;
    summary: string;
    nextAction: string;
  };
  message: string;
}

// ── API 함수 ──────────────────────────────────────

export async function createRoom(params: {
  roomType: string;
  lastMet: string;
  memberCount: string;
  purpose: string;
  cardTone: string;
}) {
  const payload: CreateRoomRequest = {
    roomType: ROOM_TYPE_MAP[params.roomType],
    lastMeeting: LAST_MEETING_MAP[params.lastMet],
    roomSize: Number(params.memberCount),
    purpose: PURPOSE_MAP[params.purpose],
    tone: TONE_MAP[params.cardTone],
  };

  const { data } = await axios.post<CreateRoomResponse>(
    `${BASE_URL}/api/rooms`,
    payload,
  );
  return data;
}

export async function createCard(roomCode: string) {
  const { data } = await axios.post<CreateCardResponse>(
    `${BASE_URL}/api/rooms/${roomCode}/card`,
  );
  return data;
}

export async function getRoom(roomCode: string) {
  const { data } = await axios.get<RoomDetailResponse>(
    `${BASE_URL}/api/rooms/${roomCode}`,
  );
  return data;
}

export async function getCard(roomCode: string) {
  const { data } = await axios.get<CreateCardResponse>(
    `${BASE_URL}/api/rooms/${roomCode}/card`,
  );
  return data;
}

export async function getAnalysis(roomCode: string) {
  const { data } = await axios.get<AnalysisResponse>(
    `${BASE_URL}/api/rooms/${roomCode}/analysis`,
  );
  return data;
}

export async function createParticipant(roomCode: string, nickname: string) {
  const payload: CreateParticipantRequest = { nickname };

  const { data } = await axios.post<CreateParticipantResponse>(
    `${BASE_URL}/api/rooms/${roomCode}/participants`,
    payload,
  );
  return data;
}

export async function createReaction(
  roomCode: string,
  participantId: number,
  reactionType: string,
) {
  const payload: CreateReactionRequest = { participantId, reactionType };

  const { data } = await axios.post<CreateReactionResponse>(
    `${BASE_URL}/api/rooms/${roomCode}/reactions`,
    payload,
  );
  return data;
}
