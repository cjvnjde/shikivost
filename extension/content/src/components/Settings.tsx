import { useAtom } from "jotai";
import { settingsAtom } from "../state";
import Drawer from "./ui/Drawer";
import DrawerHeader from "./ui/DrawerHeader";
import Input from "./ui/Input";
import Select from "./ui/Select";

type SettingsProps = {
  isOpen: boolean;
  onClose: () => void;
};

const trackingOptions: {
  name: string;
  id: "none" | "videoProgress" | "watchedProgress";
}[] = [
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

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerHeader onClose={onClose} title="Настройки" />
      <form className="settings-form">
        <Select
          label="Тип автотрекинга видео"
          name="autotrackingType"
          selected={
            trackingOptions.find(
              (o) => o.id === settingsData.autotrackingType,
            ) || trackingOptions[0]
          }
          setSelected={({ id }) => {
            if (settingsData) {
              setSettingsData({
                ...settingsData,
                autotrackingType: id,
              });
            }
          }}
          options={trackingOptions}
        />
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
