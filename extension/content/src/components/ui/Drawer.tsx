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
      <div className="drawer-wrapper">
        <div className="drawer-container">
          <DialogPanel tabIndex={0} transition className="drawer-panel">
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default memo(Drawer);
