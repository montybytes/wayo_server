import { ReactNode } from "react";

export default function PageHeader(props: { children: ReactNode }) {
  return (
    <header className="sticky top-0 z-10 w-full bg-white">
      <div className="flex items-center max-w-5xl mx-auto py-4 ">
        {props.children}
      </div>
      <hr />
    </header>
  );
}
