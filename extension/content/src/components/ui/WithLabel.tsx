import { ReactElement, ReactNode } from "react";

type WithLabelProps = {
  label: ReactNode;
  children: ReactElement;
};

export const WithLabel = ({ children, label }: WithLabelProps) => {
  return (
    <label className="with-label">
      {label !== undefined && (
        <label className="with-label__label">{label}</label>
      )}
      {children}
    </label>
  );
};
