import { PropsWithChildren } from "react";
import './Theme.css';

export function Theme(props: PropsWithChildren) {
  const { children } = props;

  return <section className="pg-theme">{children}</section>;
}
