import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

export default function Button(
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) {
  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={`text-white bg-wayo-blue max-w-xs w-fit flex justify-center items-center p-2 rounded-lg uppercase font-semibold text-xs ${props.className}`}
    >
      {props.children}
    </button>
  );
}
