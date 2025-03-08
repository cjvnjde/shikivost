import { Button as ButtonHUI } from "@headlessui/react";
import { IconChevronDown } from "@tabler/icons-react";
import { ButtonHTMLAttributes, ReactNode, type Ref } from "react";
import clsx from "clsx";

type DropdownButtonVariants = {
  disabled?: boolean;
};

const getDropdownButtonClassName = ({
  disabled,
}: DropdownButtonVariants): string => {
  return clsx("dropdown-button", {
    "dropdown-button--disabled": disabled,
  });
};

export type DropdownButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  startIcon?: ReactNode;
  placeholder?: string;
  endIcon?: ReactNode;
  ref?: Ref<HTMLButtonElement>;
} & DropdownButtonVariants;

export const DropdownButton = ({
  children,
  disabled,
  placeholder = undefined,
  endIcon = undefined,
  startIcon = undefined,
  ref = undefined,
  ...props
}: DropdownButtonProps) => {
  return (
    <ButtonHUI
      ref={ref}
      type="button"
      disabled={disabled}
      className={getDropdownButtonClassName({ disabled })}
      {...props}
    >
      {startIcon}
      {children || (
        <span className="dropdown-button__placeholder">{placeholder}</span>
      )}
      <div className="dropdown-button__end-icon-container">
        {endIcon}
        <IconChevronDown size={16} className="dropdown-button__chevron" />
      </div>
    </ButtonHUI>
  );
};
