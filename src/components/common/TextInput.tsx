interface TextInputProps {
    label?: string;          // "참여자 닉네임"
    placeholder?: string;    // "단톡방 닉네임 입력"
    value?: string;
    onChange?: (value: string) => void;
}

export default function TextInput({
                                      label,
                                      placeholder,
                                      value,
                                      onChange,
                                  }: TextInputProps) {
    return (
        <div className="flex flex-col items-start self-stretch">
            {label && (
                <label className="pb-2 text-sm font-bold leading-5 text-text">
                    {label}
                </label>
            )}
            <input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange?.(e.target.value)}
                className="input-text focus:input-text-focus"
            />
        </div>
    );
}
