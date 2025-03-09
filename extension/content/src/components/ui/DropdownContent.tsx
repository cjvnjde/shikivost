import { HTMLProps, type Ref } from "react";

type DropdownContentProps = HTMLProps<HTMLDivElement> & {
  ref?: Ref<HTMLDivElement>;
};

export const DropdownContent = ({
  children,
  className,
  ref = undefined,
  ...props
}: DropdownContentProps) => {
  return (
    <div className="dropdown-content" ref={ref} {...props}>
      {children}
    </div>
  );
};
