import { Button as ButtonHUI } from "@headlessui/react";
import { IconChevronDown } from "@tabler/icons-react";
import { ButtonHTMLAttributes, ReactNode, type Ref } from "react";

export type DropdownButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  placeholder?: string;
  ref?: Ref<HTMLButtonElement>;
};

export const DropdownButton = ({
  children,
  disabled,
  placeholder = undefined,
  ref = undefined,
  ...props
}: DropdownButtonProps) => {
  return (
    <ButtonHUI
      ref={ref}
      type="button"
      disabled={disabled}
      className="dropdown-button"
      {...props}
    >
      {children ?? placeholder ?? ""}
      <IconChevronDown size={16} className="dropdown-button__chevron" />
    </ButtonHUI>
  );
};
