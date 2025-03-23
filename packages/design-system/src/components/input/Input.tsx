import { InputHTMLAttributes } from "react";
import "./Input.css";

type InputProps = InputHTMLAttributes<HTMLInputElement>;
export function Input(props: InputProps) {
   return (
       <input className="pg-input" {...props}/>
   ) 
}
