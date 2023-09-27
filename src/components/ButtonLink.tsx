import Link from "next/link";
import { ReactNode } from "react";

export default function ButtonLink(props: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={props.href}>
      <div
        className={`flex justify-center items-center max-w-fit p-2 rounded-lg bg-wayo-blue text-white uppercase font-semibold text-xs ${props.className}`}
      >
        {props.children}
      </div>
    </Link>
  );
}
