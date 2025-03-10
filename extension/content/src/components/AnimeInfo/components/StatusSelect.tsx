import { Api } from "../../../api";
import { useAtom, useAtomValue } from "jotai";
import { useAccount } from "../../../api/queries/useAccount";
import { animeAtom, currentRateAtom } from "../../../state";
import { status, statusText } from "../../../status";
import {
  Select,
  SelectButton,
  SelectContainer,
  SelectOption,
} from "../../ui/Select";
import { DropdownButton } from "../../ui/DropdownButton";

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
  const { data: accountData } = useAccount();
  const animeData = useAtomValue(animeAtom);

  const selected = options.find((option) => option.id === rate?.status);

  const onChange = async (id: string) => {
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
  };

  return (
    <Select value={selected?.id} onChange={onChange}>
      <SelectButton as={DropdownButton} placeholder="Добавить в список">
        {selected?.name}
      </SelectButton>
      <SelectContainer>
        {options.map(({ id, name }) => {
          return <SelectOption value={id}>{name}</SelectOption>;
        })}
        <SelectOption
          className="select-dropdown-option--danger"
          value={deleteOption.id}
        >
          {deleteOption.name}
        </SelectOption>
      </SelectContainer>
    </Select>
  );
}
