import { useAtom } from "jotai";
import { settingsAtom } from "../state";
import Drawer from "./ui/Drawer";
import DrawerHeader from "./ui/DrawerHeader";
import Input from "./ui/Input";
import {
  SelectButton,
  Select,
  SelectContainer,
  SelectOption,
} from "./ui/Select";
import { WithLabel } from "extension/content/src/components/ui/WithLabel";
import { DropdownButton } from "extension/content/src/components/ui/DropdownButton";

type SettingsProps = {
  isOpen: boolean;
  onClose: () => void;
};

type TrakingOption = {
  name: string;
  id: "none" | "videoProgress" | "watchedProgress";
};
const trackingOptions: TrakingOption[] = [
  {
    id: "none",
    name: "Не использовать",
  },
  {
    id: "videoProgress",
    name: "Прогресс видео",
  },
  {
    id: "watchedProgress",
    name: "Прогресс просмотра",
  },
];

export function Settings({ isOpen, onClose }: SettingsProps) {
  const [settingsData, setSettingsData] = useAtom(settingsAtom);

  if (!settingsData) {
    return null;
  }

  const selectedValue =
    trackingOptions.find((o) => o.id === settingsData.autotrackingType) ||
    trackingOptions[0];

  const setSelectedValue = (id: TrakingOption["id"]) => {
    if (settingsData) {
      setSettingsData({
        ...settingsData,
        autotrackingType: id,
      });
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerHeader onClose={onClose} title="Настройки" />
      <form className="settings-form">
        <WithLabel label="Тип автотрекинга видео">
          <Select
            value={settingsData.autotrackingType}
            onChange={setSelectedValue}
          >
            <SelectButton>
              <DropdownButton>{selectedValue?.name}</DropdownButton>
            </SelectButton>
            <SelectContainer>
              {trackingOptions.map(({ id, name }) => {
                return <SelectOption value={id}>{name}</SelectOption>;
              })}
            </SelectContainer>
          </Select>
        </WithLabel>
        <Input
          label="Лимит прогресса"
          type="number"
          name="progressValue"
          value={String(settingsData.progressValue)}
          onChange={(newValue) => {
            const val = Number(newValue);
            const data = Math.max(
              Math.min(Number.isNaN(val) ? 60 : val, 100),
              0,
            );
            if (settingsData) {
              setSettingsData({
                ...settingsData,
                progressValue: data,
              });
            }
          }}
        />
      </form>
    </Drawer>
  );
}
