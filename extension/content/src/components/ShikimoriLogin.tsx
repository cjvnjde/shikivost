import { useCallback, useState } from "react";
import { useAccount } from "../api/queries/useAccount";
import { config } from "../config";
import { Settings } from "./Settings";
import { IconShikimori } from "./icons/IconShikimori";
import { IconLogin } from "@tabler/icons-react";

const SettingsIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onOpen = useCallback(() => setIsOpen(true), []);

  return (
    <>
      <Settings isOpen={isOpen} onClose={onClose} />
      <button type="button" className="shikimori-icon-button" onClick={onOpen}>
        <IconShikimori />
      </button>
    </>
  );
};

export function ShikimoriLogin() {
  const { data: account } = useAccount();

  if (account?.id) {
    return <SettingsIcon />;
  }

  return (
    <a href={config.authorizationUrl} className="shikimori-icon-button tooltip">
      <IconLogin />
      <span className="tooltiptext">Вход в Shikivost</span>
    </a>
  );
}
