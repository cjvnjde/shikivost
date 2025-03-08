import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { IconCheck, IconSelector } from "@tabler/icons-react";

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
        <div className="select-group">
          <label className="select-label">{label}</label>
          <div className="select-relative-wrapper">
            <ListboxButton className="select-button">
              <span className="select-button-text">{selected.name}</span>
              <span className="select-button-icon">
                <IconSelector
                  className="select-icon-selector"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            <Transition
              show={open}
              leave="select-transition"
              leaveFrom="select-transition-from"
              leaveTo="select-transition-to"
            >
              <ListboxOptions className="select-options">
                {options.map((option) => (
                  <ListboxOption
                    key={option.id}
                    className={({ focus }) =>
                      `select-option ${focus ? "select-option-focus" : ""}`
                    }
                    value={option}
                  >
                    {({ selected, focus }) => (
                      <>
                        <span
                          className={`select-option-text ${selected ? "select-option-selected" : ""}`}
                        >
                          {option.name}
                        </span>

                        {selected ? (
                          <span
                            className={`select-option-check ${
                              focus
                                ? "select-option-check-focus"
                                : "select-option-check-active"
                            }`}
                          >
                            <IconCheck
                              className="select-check-icon"
                              aria-hidden="true"
                            />
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
