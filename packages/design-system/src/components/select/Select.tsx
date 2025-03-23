import { PropsWithChildren, SelectHTMLAttributes } from "react";
import "./Select.css";

type SelectProps = PropsWithChildren<SelectHTMLAttributes<HTMLSelectElement>>;

export function Select(props: SelectProps) {
  const { children, ...selectProps } = props;

  return (
    <select className="pg-select" {...selectProps}>
      {children}
    </select>
  );
}
