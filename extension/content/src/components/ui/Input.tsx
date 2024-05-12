import { Input as HInput } from '@headlessui/react';
import { useCallback, useId } from 'preact/compat';
import { JSXInternal } from 'preact/src/jsx';
import GenericEventHandler = JSXInternal.GenericEventHandler;

type InputProps = {
  label: string;
  name: HTMLInputElement['name'];
  placeholder?: HTMLInputElement['placeholder'];
  type: HTMLInputElement['type'];
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

  const onValueChange = useCallback<GenericEventHandler<HTMLInputElement>>(
    (e) => {
      onChange(e.currentTarget.value);
    },
    [onChange],
  );

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <HInput
          value={value}
          type={type}
          name={name}
          id={id}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={placeholder}
          onChange={onValueChange}
        />
      </div>
    </div>
  );
};

export default Input;
