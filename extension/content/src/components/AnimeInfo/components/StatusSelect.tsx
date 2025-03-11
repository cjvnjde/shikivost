import { Api } from "../../../api";
import { useCreateRating } from "../../../api/mutations/useCreateRating";
import { useSetRating } from "../../../api/mutations/useSetRating";
import { useAccount } from "../../../api/queries/useAccount";
import { useAnime } from "../../../api/queries/useAnime";
import { useRating } from "../../../api/queries/useRating";
import { status, statusText } from "../../../status";
import {
  Select,
  SelectButton,
  SelectContainer,
  SelectOption,
} from "../../ui/Select";
import { DropdownButton } from "../../ui/DropdownButton";

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
  const { data: rating } = useRating();
  const { data: accountData } = useAccount();
  const { data: animeData } = useAnime();
  const { mutate: createRating, isPending: isCreating } = useCreateRating(
    accountData?.id ?? -1,
    animeData?.id ?? -1,
  );
  const { mutate: setRating, isPending: isUpdating } = useSetRating(
    accountData?.id ?? -1,
    animeData?.id ?? -1,
    rating?.id ?? -1,
  );

  const isLoading = isUpdating || isCreating;

  const selected = options.find((option) => option.id === rating?.status);

  const onChange = async (status: string) => {
    if (!rating) {
      createRating(status);
    } else {
      if (accountData?.id && animeData?.id) {
        if (status === deleteOption.id && rating?.id) {
          setRating(null);
        } else {
          setRating(status);
        }
      }
    }
  };

  return (
    <Select value={selected?.id} onChange={onChange}>
      <SelectButton
        as={DropdownButton}
        disabled={isLoading}
        placeholder="Добавить в список"
      >
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
