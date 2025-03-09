import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { memo, PropsWithChildren } from "react";

export type DrawerProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
}>;

const Drawer = ({ children = undefined, isOpen, onClose }: DrawerProps) => {
  return (
    <Dialog open={isOpen} transition className="drawer" onClose={onClose}>
      <DialogBackdrop transition className="drawer-backdrop" />
      <DialogPanel tabIndex={0} transition className="drawer-panel">
        {children}
      </DialogPanel>
    </Dialog>
  );
};

export default memo(Drawer);
