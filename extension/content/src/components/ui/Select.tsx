import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { IconCheck, IconSelector } from '@tabler/icons-react';
import { cx } from 'class-variance-authority';

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
  return (
    <Listbox value={selected} onChange={setSelected} name={name}>
      {({ open }) => (
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            {label}
          </label>
          <div className="relative mt-2">
            <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <IconSelector
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <ListboxOption
                    key={option.id}
                    className={({ focus }) =>
                      cx(
                        focus ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                      )
                    }
                    value={option}
                  >
                    {({ selected, focus }) => (
                      <>
                        <span
                          className={cx(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate',
                          )}
                        >
                          {option.name}
                        </span>

                        {selected ? (
                          <span
                            className={cx(
                              focus ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <IconCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
};

export default Select;
