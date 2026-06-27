type TextInputProps = {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
};

export function TextInput({
  placeholder,
  value,
  onChange,
  helperText,
}: TextInputProps) {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-[14px] border-[0.8px] border-border bg-bg text-text text-sm placeholder:text-text/50 outline-none focus:border-orange"
      />
      {helperText && <p className="text-xs text-muted pt-1.5">{helperText}</p>}
    </div>
  );
}
