import { Input as HInput } from "@headlessui/react";
import { ChangeEvent, useCallback, useId } from "react";

type InputProps = {
  label: string;
  name: HTMLInputElement["name"];
  placeholder?: HTMLInputElement["placeholder"];
  type: HTMLInputElement["type"];
  value: string;
  onChange: (value: string) => void;
};

const Input = ({
  label,
  placeholder,
  name,
  type,
  value,
  onChange,
}: InputProps) => {
  const id = useId();

  const onValueChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.currentTarget.value);
    },
    [onChange],
  );

  return (
    <div className="input-group">
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <div className="input-container">
        <HInput
          value={value}
          type={type}
          name={name}
          id={id}
          className="h-input"
          placeholder={placeholder}
          onChange={onValueChange}
        />
      </div>
    </div>
  );
};

export default Input;
