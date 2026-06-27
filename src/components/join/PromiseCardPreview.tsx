// src/components/join/PromiseCardPreview.tsx
interface PromiseCardPreviewProps {
  cardMeta: string;
  badgeText: string;
  title: string;
  description: string;
  temp: number;
  reactionCount: number;
}

// 온도계 아이콘 SVG
const ThermometerIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#thermo)">
      <path
        d="M6.41675 1.83332V6.66416C6.76626 6.86595 7.03942 7.17742 7.19386 7.55028C7.3483 7.92314 7.3754 8.33654 7.27095 8.72637C7.16649 9.1162 6.93633 9.46067 6.61614 9.70635C6.29596 9.95203 5.90366 10.0852 5.50008 10.0852C5.0965 10.0852 4.7042 9.95203 4.38402 9.70635C4.06384 9.46067 3.83367 9.1162 3.72922 8.72637C3.62476 8.33654 3.65186 7.92314 3.8063 7.55028C3.96075 7.17742 4.23391 6.86595 4.58342 6.66416V1.83332C4.58342 1.59021 4.67999 1.35705 4.8519 1.18514C5.02381 1.01323 5.25697 0.916656 5.50008 0.916656C5.7432 0.916656 5.97636 1.01323 6.14826 1.18514C6.32017 1.35705 6.41675 1.59021 6.41675 1.83332Z"
        stroke="#E9782F"
        strokeWidth="0.916667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="thermo">
        <rect width="11" height="11" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

// 사람 아이콘 SVG
const UsersIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#users)">
      <path
        d="M7.33341 9.625V8.70833C7.33341 8.2221 7.14026 7.75579 6.79644 7.41197C6.45263 7.06815 5.98631 6.875 5.50008 6.875H2.75008C2.26385 6.875 1.79754 7.06815 1.45372 7.41197C1.1099 7.75579 0.916748 8.2221 0.916748 8.70833V9.625"
        stroke="#7B6658"
        strokeWidth="0.916667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.12508 5.04167C5.1376 5.04167 5.95841 4.22086 5.95841 3.20833C5.95841 2.19581 5.1376 1.375 4.12508 1.375C3.11256 1.375 2.29175 2.19581 2.29175 3.20833C2.29175 4.22086 3.11256 5.04167 4.12508 5.04167Z"
        stroke="#7B6658"
        strokeWidth="0.916667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0833 9.62499V8.70832C10.0829 8.30211 9.94775 7.90751 9.69888 7.58646C9.45001 7.26542 9.10156 7.03612 8.70825 6.93457"
        stroke="#7B6658"
        strokeWidth="0.916667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.33325 1.43457C7.72761 1.53554 8.07714 1.76489 8.32675 2.08646C8.57636 2.40803 8.71185 2.80353 8.71185 3.21061C8.71185 3.61769 8.57636 4.01319 8.32675 4.33476C8.07714 4.65633 7.72761 4.88568 7.33325 4.98665"
        stroke="#7B6658"
        strokeWidth="0.916667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="users">
        <rect width="11" height="11" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default function PromiseCardPreview({
  cardMeta,
  badgeText,
  title,
  description,
  temp,
  reactionCount,
}: PromiseCardPreviewProps) {
  return (
    <div
      className="self-stretch overflow-hidden rounded-2xl border-[0.8px] border-[#f0be83]"
      style={{ boxShadow: "0px 4px 16px 0 rgba(36,21,14,0.08)" }}
    >
      {/* 카드 헤더 */}
      <div className="flex justify-between items-center px-4 py-2.5 bg-[#fff7ea] border-b-[0.8px] border-[#f0be83]">
        <p className="text-[9px] font-bold uppercase text-orange">
          진짜보자 카드
        </p>
        <p className="text-[9px] text-muted">{cardMeta}</p>
      </div>

      {/* 카드 본문 */}
      <div className="flex flex-col p-4 bg-card">
        {/* 뱃지 */}
        <div className="h-10 relative mb-0">
          <div className="inline-flex items-center h-7 px-2.5 rounded-full bg-orange">
            <p className="text-[10px] font-bold text-white">{badgeText}</p>
          </div>
        </div>

        {/* 제목 */}
        <p className="text-sm font-bold text-text">{title}</p>

        {/* 설명 */}
        <p className="pt-1 text-xs text-muted">{description}</p>

        {/* 메타 */}
        <div className="flex items-center gap-3 pt-3 h-[27px]">
          <div className="flex items-center gap-1">
            <ThermometerIcon />
            <p className="text-[10px] text-muted">{temp}℃</p>
          </div>
          <p className="text-[10px] text-muted">·</p>
          <div className="flex items-center gap-1">
            <UsersIcon />
            <p className="text-[10px] text-muted">{reactionCount}명 반응 중</p>
          </div>
        </div>
      </div>
    </div>
  );
}
