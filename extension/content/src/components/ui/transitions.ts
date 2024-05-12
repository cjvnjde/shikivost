import { TransitionClasses } from '@headlessui/react';

export const TRANSITIONS = {
  OPACITY: {
    enter: 'transition-opacity ease-out duration-300',
    enterFrom: 'opacity-0',
    enterTo: 'opacity-100',
    leave: 'transition-opacity ease-in duration-300',
    leaveFrom: 'opacity-100',
    leaveTo: 'opacity-0',
  },
  SLIDE_RIGHT: {
    enter: 'transition ease-out duration-300',
    enterFrom: 'opacity-0 translate-x-full',
    enterTo: 'opacity-100 translate-x-0',
    leave: 'transition ease-in duration-300',
    leaveFrom: 'opacity-100 translate-x-0',
    leaveTo: 'opacity-0 translate-x-full',
  },
  DROPDOWN: {
    enter: 'transition ease-out duration-100',
    enterFrom: 'transform opacity-0 scale-95',
    enterTo: 'transform opacity-100 scale-100',
    leave: 'transition ease-in duration-75',
    leaveFrom: 'transform opacity-100 scale-100',
    leaveTo: 'transform opacity-0 scale-95',
  },
  COLLAPSIBLE: {
    enter: 'transition-height duration-150 ease-in-accordion',
    enterFrom: 'max-h-0',
    enterTo: 'max-h-[9999px]',
    leave: 'transition-height duration-150 ease-out-accordion',
    leaveFrom: 'max-h-[9999px]',
    leaveTo: 'max-h-0',
  },
} as const satisfies { [key: string]: TransitionClasses };
