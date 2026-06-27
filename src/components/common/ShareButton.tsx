import { MessageCircle } from "lucide-react";

interface ShareButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

export default function ShareButton({ children, onClick, disabled }: ShareButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="
        flex w-full items-center justify-center gap-2
        rounded-2xl bg-kakao py-4
        text-base font-bold leading-6 text-[#191600]
        transition hover:brightness-95 active:brightness-90
        disabled:cursor-not-allowed disabled:opacity-50
      "
        >
            <MessageCircle size={20} fill="#191600" strokeWidth={0} />
            {children}
        </button>
    );
}