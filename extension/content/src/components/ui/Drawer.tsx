import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { memo, PropsWithChildren } from 'react';
import { TRANSITIONS } from './transitions';

export type DrawerProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
}>;

const Drawer = ({ children = undefined, isOpen, onClose }: DrawerProps) => {
  return (
    <Transition
      as={Dialog}
      show={isOpen}
      className="relative z-40"
      onClose={onClose}
    >
      <TransitionChild
        as="div"
        {...TRANSITIONS.SLIDE_RIGHT}
        className="fixed inset-0 flex justify-end"
      >
        <div className="flex right-0 inset-y-0 items-center w-min">
          <DialogPanel
            tabIndex={0}
            className="flex h-screen max-h-screen flex-col overflow-hidden bg-white transition-width"
          >
            {children}
          </DialogPanel>
        </div>
      </TransitionChild>
    </Transition>
  );
};

export default memo(Drawer);
