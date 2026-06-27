interface ButtonProps {
  variant?: "primary" | "ghost" | "kakao";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const variants = {
  primary:
    "bg-orange text-white shadow-[0_4px_12px_rgba(233,120,47,0.3)] hover:bg-orange-dark active:bg-orange-dark",
  ghost:
    "bg-bg text-muted border-[1.5px] border-border hover:bg-section active:bg-cardWeak",
  kakao: "bg-kakao text-[#191600] hover:brightness-95 active:brightness-90",
};

export default function Button({
  variant = "primary",
  children,
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full py-4 rounded-2xl font-bold text-body-lg cursor-pointer
        transition disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
      `}
    >
      {children}
    </button>
  );
}
