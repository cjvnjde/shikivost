import { HTMLProps, type Ref } from "react";

type DropdownContainerProps = HTMLProps<HTMLDivElement> & {
  ref?: Ref<HTMLDivElement>;
};

export const DropdownContainer = ({
  children,
  ref = undefined,
  ...props
}: DropdownContainerProps) => {
  return (
    <div className="dropdown-container" ref={ref} {...props}>
      {children}
    </div>
  );
};
