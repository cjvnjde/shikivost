import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { PropsWithChildren } from 'preact/compat';
import { TRANSITIONS } from './transitions';

export type DrawerProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
}>;

const Drawer = ({ children = undefined, isOpen, onClose }: DrawerProps) => {
  return (
    <Transition show={isOpen}>
      <Dialog className="relative z-40" onClose={onClose}>
        <TransitionChild {...TRANSITIONS.OPACITY}>
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>
        <div className="fixed inset-0">
          <TransitionChild {...TRANSITIONS.SLIDE_RIGHT}>
            <div className="flex h-screen items-center justify-end">
              <DialogPanel
                tabIndex={0}
                className="flex h-screen max-h-screen flex-col overflow-hidden bg-white transition-width"
              >
                {children}
              </DialogPanel>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Drawer;
