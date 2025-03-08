import { DialogTitle } from "@headlessui/react";
import { IconX } from "@tabler/icons-react";

type PopupHeaderProps = {
  onClose?: () => void;
  title: string;
};

const DrawerHeader = ({ onClose = undefined, title }: PopupHeaderProps) => {
  return (
    <DialogTitle className="drawer-header">
      <span className="drawer-title">{title}</span>
      <button type="button" onClick={onClose} className="drawer-close-button">
        <IconX size={20} stroke={2} />
      </button>
    </DialogTitle>
  );
};

export default DrawerHeader;
