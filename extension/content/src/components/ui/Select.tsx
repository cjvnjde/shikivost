import { Select as HSelect } from '@headlessui/react';
import { TargetedEvent, useId } from 'preact/compat';

type SelectProps<Option> = {
  selected: Option;
  setSelected: (value: Option) => void;
  options: Option[];
  label: string;
  name: string;
};

const Select = <Option extends { name: string; id: string }>({
  selected,
  setSelected,
  options,
  label,
  name,
}: SelectProps<Option>) => {
  const id = useId();

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <HSelect
        id={id}
        name={name}
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        defaultValue={selected.id}
        onChange={(e: TargetedEvent<HTMLSelectElement>) => {
          setSelected(
            options.find(({ id }) => id === e.currentTarget.value) ||
              options[0],
          );
        }}
      >
        {options.map(({ id, name }) => (
          <option value={id}>{name}</option>
        ))}
      </HSelect>
    </div>
  );
};

export default Select;
