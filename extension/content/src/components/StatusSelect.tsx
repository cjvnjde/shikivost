import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { Api } from "@shikivost/api";
import { IconCheck, IconSelector, IconTrash } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useAtomValue } from "jotai/index";
import { accountAtom, animeAtom, currentRateAtom } from "../state";
import { status, statusText } from "../status";

const api = Api.create();

const options = Object.values(status).map((statusValue) => {
  return {
    id: statusValue,
    name: statusText[statusValue],
  };
});

const deleteOption = {
  id: "delete",
  name: "Удалить из списка",
};

export function StatusSelect() {
  const [rate, setRate] = useAtom(currentRateAtom);
  const accountData = useAtomValue(accountAtom);
  const animeData = useAtomValue(animeAtom);

  const selected = options.find((option) => option.id === rate?.status);

  return (
    <Listbox
      value={selected}
      onChange={async ({ id }) => {
        if (accountData?.id && animeData?.id) {
          if (id === deleteOption.id && rate?.id) {
            await api.deleteRate(rate.id);
            setRate(null);
          } else {
            setRate(
              await api.setRate(id, {
                id: rate?.id,
                userId: accountData.id,
                animeId: animeData.id,
              }),
            );
          }
        }
      }}
    >
      {({ open }) => (
        <div className="status-select-container">
          <ListboxButton className="status-select-button">
            <span className="status-select-button-text">
              {selected?.name || "Добавить в список"}
            </span>
            <span className="status-select-button-icon">
              <IconSelector className="status-select-icon" aria-hidden="true" />
            </span>
          </ListboxButton>

          <Transition
            show={open}
            leave="status-select-transition"
            leaveFrom="status-select-transition-from"
            leaveTo="status-select-transition-to"
          >
            <ListboxOptions className="status-select-options">
              {options.map((option) => (
                <ListboxOption
                  key={option.id}
                  className={({ focus }) =>
                    `status-select-option ${
                      focus ? "status-select-option-focus" : ""
                    }`
                  }
                  value={option}
                >
                  {({ selected, focus }) => (
                    <>
                      <span
                        className={`status-select-option-text ${
                          selected ? "status-select-option-selected" : ""
                        }`}
                      >
                        {option.name}
                      </span>

                      {selected ? (
                        <span
                          className={`status-select-option-check ${
                            focus
                              ? "status-select-option-check-focus"
                              : "status-select-option-check-active"
                          }`}
                        >
                          <IconCheck
                            className="status-select-check-icon"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
              <ListboxOption
                className={({ focus }) =>
                  `status-select-option status-select-delete-option ${
                    focus ? "status-select-delete-option-focus" : ""
                  }`
                }
                value={deleteOption}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`status-select-option-text ${
                        selected ? "status-select-option-selected" : ""
                      }`}
                    >
                      {deleteOption.name}
                    </span>
                    <span className="status-select-delete-icon">
                      <IconTrash
                        className="status-select-trash-icon"
                        aria-hidden="true"
                      />
                    </span>
                  </>
                )}
              </ListboxOption>
            </ListboxOptions>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
