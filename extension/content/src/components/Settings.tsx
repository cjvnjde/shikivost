import { settings } from '../state';
import { Drawer } from './Drawer';
import { DrawerHeader } from './DrawerHeader';

type SettingsProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Settings({ isOpen, onClose }: SettingsProps) {
  if (!settings.value) {
    return null;
  }

  return (
    <>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerHeader onClose={onClose}>Настройки</DrawerHeader>
        <form className="form-container">
          <div>
            <label htmlFor="autotrackingType" className="form-label">
              Тип автотрекинга видео
            </label>
            <select
              id="autotrackingType"
              name="autotrackingType"
              className="form-select"
              defaultValue="wachedProgress"
              value={settings.value?.autotrackingType}
              onChange={(e) => {
                if (settings.value) {
                  settings.value = {
                    ...settings.value,
                    autotrackingType: e.currentTarget.value as
                      | 'none'
                      | 'videoProgress'
                      | 'watchedProgress',
                  };
                }
              }}
            >
              <option value="none">Не использовать</option>
              <option value="videoProgress">Прогресс видео</option>
              <option value="watchedProgress">Прогресс просмотра</option>
            </select>
          </div>

          <div>
            <label htmlFor="progressValue" className="form-label">
              Лимит прогресса
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="progressValue"
                id="progressValue"
                className="form-input"
                value={settings.value.progressValue}
                onChange={(e) => {
                  const val = Number(e.currentTarget.value);
                  const data = Math.max(
                    Math.min(Number.isNaN(val) ? 60 : val, 100),
                    0
                  );
                  if (settings.value) {
                    settings.value = {
                      ...settings.value,
                      progressValue: dat,
                    };
                  }
                }}
              />
            </div>
          </div>
        </form>
      </Drawer>
    </>
  );
}
