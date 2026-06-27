// src/components/analysis/StatBox.tsx
interface StatBoxProps {
  label: string;
  children: React.ReactNode;
}

export default function StatBox({ label, children }: StatBoxProps) {
  return (
    <div className="flex-1 flex flex-col p-3 rounded-2xl bg-card border-[0.8px] border-border">
      <p className="text-[10px] text-center text-muted">{label}</p>
      <div className="pt-1 flex justify-center items-baseline leading-none">
        {children}
      </div>
    </div>
  );
}
