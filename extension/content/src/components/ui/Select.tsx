import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptionProps,
  ListboxOptions,
} from "@headlessui/react";
import { HTMLProps, type Ref } from "react";
import { DropdownContainer } from "./DropdownContainer";
import { DropdownContent } from "./DropdownContent";
import clsx from "clsx";

type SelectContainerProps = HTMLProps<HTMLDivElement> & {
  ref?: Ref<HTMLDivElement>;
  placement?: "top" | "bottom";
};

export const Select = Listbox;

export const SelectButton = ListboxButton;

export const SelectOption = ({ children, className, ...props }: ListboxOptionProps) => {
  return (
    <ListboxOption className={clsx("select-dropdown-option", className) {...props}>
      {children}
    </ListboxOption>
  );
};

export const SelectContainer = ({
  children,
  className,
  placement = "bottom",
  ...props
}: SelectContainerProps) => {
  return (
    <ListboxOptions
      portal
      anchor={{
        gap: 2,
        to: placement,
      }}
      transition
      className="dropdown-container dropdown-container--select"
      {...props}
      as={DropdownContainer}
    >
      <DropdownContent>{children}</DropdownContent>
    </ListboxOptions>
  );
};
