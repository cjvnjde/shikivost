import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptionProps,
  ListboxOptions,
} from "@headlessui/react";
import { HTMLProps, type Ref } from "react";
import { DropdownContainer } from "./DropdownContainer";

type SelectContainerProps = HTMLProps<HTMLDivElement> & {
  ref?: Ref<HTMLDivElement>;
  placement?: "top" | "bottom";
};

export const Select = Listbox;

export const SelectButton = ListboxButton;

export const SelectOption = ({ children, ...props }: ListboxOptionProps) => {
  return (
    <ListboxOption className="select-dropdown-option" {...props}>
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
      className="select-dropdown"
      {...props}
      as={DropdownContainer}
    >
      {children}
    </ListboxOptions>
  );
};
