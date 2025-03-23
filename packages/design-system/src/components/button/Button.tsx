import { ButtonHTMLAttributes, PropsWithChildren } from "react";

import "./Button.css";
import classNames from "classnames";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;
export function Button(props: ButtonProps) {
  const { children, className, ...buttonProps } = props;
  const buttonClasses = classNames("pg-button", className);

  return (
    <button className={buttonClasses} {...buttonProps}>
      {children}
    </button>
  );
}
