import { ReactElement } from "react";


interface ButtonProps {
    variant : "primary" | "secondary";
    size : "sm" | "md" | "lg";
    text : string;
    startIcon? : ReactElement;
    endIcon? : any;
    onClick? : () => void;
}

const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-700" 
}
const sizeStyles = {
    "sm": "py-1 px-2",
    "md": "py-2 px-4",
    "lg": "py-4 px-6"
}
const defaultStyles = "rounded-md flex gap-2 items-center "

export const Button = (props: ButtonProps) => {

  return (
    <button onClick={props.onClick} className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`}>
       {props.startIcon} {props.text} {props.endIcon}
    </button>
  ); 
};