import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export default function TextField(
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & { label?: string }
) {
  return props.label ? (
    <label className="flex flex-col">
      {props.label}
      <input
        {...props}
        className={`rounded-lg p-1 max-w-sm placeholder:italic placeholder:text-sm ${
          props.disabled ? "bg-neutral-100" : "bg-neutral-200"
        }`}
      />
    </label>
  ) : (
    <input
      {...props}
      className={`rounded-lg p-1 max-w-sm placeholder:italic placeholder:text-sm ${
        props.disabled ? "bg-neutral-100" : "bg-neutral-200"
      }`}
    />
  );
}
