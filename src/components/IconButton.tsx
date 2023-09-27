import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export default function IconButton(
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) {
  return (
    <button
      type="button"
      className="rounded-full max-w-[36px] max-h-[36px] hover:bg-neutral-200  flex items-center justify-center p-1 text-neutral-400"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
