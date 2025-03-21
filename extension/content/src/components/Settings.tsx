import { useAtom } from "jotai";
import { settingsAtom } from "../state";
import Drawer from "./ui/Drawer";
import DrawerHeader from "./ui/DrawerHeader";
import { Input } from "./ui/Input";
import {
  SelectButton,
  Select,
  SelectContainer,
  SelectOption,
} from "./ui/Select";
import { WithLabel } from "./ui/WithLabel";
import { DropdownButton } from "./ui/DropdownButton";

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
            <SelectButton as={DropdownButton}>
              {selectedValue?.name}
            </SelectButton>
            <SelectContainer>
              {trackingOptions.map(({ id, name }) => {
                return <SelectOption value={id}>{name}</SelectOption>;
              })}
            </SelectContainer>
          </Select>
        </WithLabel>

        <WithLabel label="Лимит прогресса">
          <Input
            type="number"
            name="progressValue"
            value={String(settingsData.progressValue)}
            onChange={(e) => {
              const newValue = e.target.value;
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
        </WithLabel>
      </form>
    </Drawer>
  );
}
