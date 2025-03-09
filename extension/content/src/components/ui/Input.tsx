import { Input as InputHUI } from "@headlessui/react";
import { InputHTMLAttributes, PropsWithChildren, ReactNode, Ref } from "react";

export type BaseInputWrapperProps = PropsWithChildren<{
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}>;

export type InputProps = Omit<BaseInputWrapperProps, "children"> &
  InputHTMLAttributes<HTMLInputElement> & {
    ref?: Ref<HTMLInputElement>;
  };

export const InputWrapper = ({
  children,
  startIcon = null,
  endIcon = null,
}: BaseInputWrapperProps) => {
  return (
    <label className="input-wrapper">
      {startIcon}
      {children}
      {endIcon}
    </label>
  );
};

export const Input = ({
  startIcon,
  endIcon,
  ref = undefined,
  ...props
}: InputProps) => {
  return (
    <InputWrapper startIcon={startIcon} endIcon={endIcon}>
      <InputHUI ref={ref} className="input" {...props} />
    </InputWrapper>
  );
};
