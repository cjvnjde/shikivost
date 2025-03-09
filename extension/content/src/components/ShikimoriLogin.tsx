import { authorizationUrl } from "@shikivost/api";
import { useAtomValue } from "jotai/index";
import { useCallback, useState } from "react";
import { accountAtom } from "../state";
import { Settings } from "./Settings";
import { IconShikimori } from "./icons/IconShikimori";
import { IconLogin } from "@tabler/icons-react";

export function ShikimoriLogin() {
  const [isOpen, setIsOpen] = useState(false);
  const accountData = useAtomValue(accountAtom);

  const onClose = useCallback(() => setIsOpen(false), []);

  if (accountData?.id) {
    return (
      <>
        <Settings isOpen={isOpen} onClose={onClose} />
        <div className="shikimori-icon-button" onClick={() => setIsOpen(true)}>
          <IconShikimori />
        </div>
      </>
    );
  }

  return (
    <a href={authorizationUrl} className="shikimori-icon-button tooltip">
      <IconLogin />
      <span className="tooltiptext">Вход в Shikivost</span>
    </a>
  );
}
