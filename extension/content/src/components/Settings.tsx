import { settings } from '../state';
import { Drawer } from './Drawer';
import { DrawerHeader } from './DrawerHeader';

export function Settings({ isOpen, onClose }) {
  if (!settings.value) {
    return null;
  }

  return (
    <>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerHeader onClose={onClose}>Настройки</DrawerHeader>
        <form className="form-container">
          <div>
            <label htmlFor="location" className="form-label">
              Тип автотрекинга видео
            </label>
            <select
              id="location"
              name="location"
              className="form-select"
              defaultValue="wachedProgress"
              value={settings.value?.autotrackingType}
              onChange={(e) => {
                settings.value = {
                  ...settings.value,
                  autotrackingType: e.currentTarget.value as any,
                };
              }}
            >
              <option value="none">Не использовать</option>
              <option value="videoProgress">Прогресс видео</option>
              <option value="wachedProgress">Прогресс просмотра</option>
            </select>
          </div>

          <div>
            <label htmlFor="email" className="form-label">
              Лимит прогресса
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="email"
                id="email"
                className="form-input"
                value={settings.value.progressValue}
                onChange={(e) => {
                  const val = Number(e.currentTarget.value);
                  const data = Math.max(
                    Math.min(Number.isNaN(val) ? 60 : val, 100),
                    0
                  );
                  settings.value = {
                    ...settings.value,
                    progressValue: data,
                  };
                }}
              />
            </div>
          </div>
        </form>
      </Drawer>
    </>
  );
}
