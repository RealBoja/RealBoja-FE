// src/components/common/Card.tsx
interface CardProps {
    variant?: "default" | "warm";
    label?: string;
    children: React.ReactNode;
}

export default function Card({ variant = "default", label, children }: CardProps) {
    const styles = {
        default: "bg-card border-border",
        warm: "bg-cardWeak border-border-point",
    };

    return (
        <div className={`border rounded-2xl p-5 ${styles[variant]}`}>
            {label && (
                <p className={`text-caption ${variant === "warm" ? "font-bold text-orange" : "text-muted"}`}>
                    {label}
                </p>
            )}
            <div className="text-body-lg font-bold text-text">{children}</div>
        </div>
    );
}