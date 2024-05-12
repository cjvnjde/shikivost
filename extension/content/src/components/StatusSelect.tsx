import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { Api } from '@shikivost/api';
import { IconCheck, IconSelector, IconTrash } from '@tabler/icons-react';
import { cx } from 'class-variance-authority';
import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/index';
import { accountAtom, animeAtom, currentRateAtom } from '../state';
import { status, statusText } from '../status';

const api = Api.create();

const options = Object.values(status).map((statusValue) => {
  return {
    id: statusValue,
    name: statusText[statusValue],
  };
});

const deleteOption = {
  id: 'delete',
  name: 'Удалить из списка',
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
        <div className="relative mt-2">
          <ListboxButton className="relative w-full cursor-pointer transition-colors rounded-md bg-orange-300 py-1.5 pl-3 pr-10 text-left text-yellow-700 shadow-sm sm:text-sm sm:leading-6">
            <span className="block truncate">
              {selected?.name || 'Добавить в список'}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <IconSelector
                className="h-5 w-5 text-yellow-800"
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
            <ListboxOptions className="absolute z-10 mt-1 max-h-80 w-full overflow-auto rounded-md bg-orange-300 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <ListboxOption
                  key={option.id}
                  className={({ focus }) =>
                    cx(
                      focus
                        ? 'bg-orange-800 text-orange-200'
                        : 'text-orange-800',
                      'relative cursor-pointer select-none py-2 pl-3 pr-9',
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
                            focus ? 'text-orange-200' : 'text-orange-800',
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
              <ListboxOption
                className={({ focus }) =>
                  cx(
                    focus ? 'bg-red-800' : 'bg-red-700',
                    'relative cursor-pointer select-none py-2 pl-3 pr-9  text-orange-200',
                  )
                }
                value={deleteOption}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={cx(
                        selected ? 'font-semibold' : 'font-normal',
                        'block truncate',
                      )}
                    >
                      {deleteOption.name}
                    </span>
                    <span className="absolute inset-y-0 right-0 text-orange-200 flex items-center pr-4">
                      <IconTrash className="h-5 w-5" aria-hidden="true" />
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
