import { DialogTitle } from '@headlessui/react';
import { IconX } from '@tabler/icons-react';

type PopupHeaderProps = {
  onClose?: () => void;
  title: string;
};

const DrawerHeader = ({ onClose = undefined, title }: PopupHeaderProps) => {
  return (
    <DialogTitle className="flex flex-row justify-between p-4 border-b border-gray-200 text-sm font-medium">
      <span className="flex text-sm !leading-6">{title}</span>
      <button
        type="button"
        onClick={onClose}
        className="h-6 w-6"
        data-testid="close-button"
      >
        <IconX size={20} className="text-gray-600" stroke={2} />
      </button>
    </DialogTitle>
  );
};

export default DrawerHeader;
