import { PropsWithChildren } from "react";

export const DropdownItem = ({ children }: PropsWithChildren) => {
  return <span className="dropdown-item">{children}</span>;
};
