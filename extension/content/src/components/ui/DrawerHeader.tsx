import { DialogTitle } from "@headlessui/react";
import { IconX } from "@tabler/icons-react";
import { memo } from "react";

type PopupHeaderProps = {
  onClose?: () => void;
  title: string;
};

const DrawerHeader = ({ onClose = undefined, title }: PopupHeaderProps) => {
  return (
    <DialogTitle className="drawer-header extension">
      <span className="drawer-header__title">{title}</span>
      <button type="button" onClick={onClose} className="drawer-header__close">
        <IconX size={20} stroke={2} />
      </button>
    </DialogTitle>
  );
};

export default memo(DrawerHeader);
