"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathName = usePathname();

  const links = [
    { href: "", title: "Dashboard" },
    { href: "malls", title: "Malls" },
  ];

  const activeStyle = "bg-wayo-blue text-white rounded-lg";
  const inactiveStyle = "hover:bg-neutral-200 hover:text-black rounded-lg";

  const linkStyle = (isActive: boolean) => {
    let fillStyle = isActive ? activeStyle : inactiveStyle;
    return `${fillStyle} my-1 transition-colors ease-in`;
  };

  const linksList = links.map((link) => {
    const isActive = pathName == `/admin/${link.href}`;

    return (
      <Link
        key={link.href}
        href={`/admin/${link.href}`}
        className={linkStyle(isActive)}
      >
        <li className="p-2">{link.title}</li>
      </Link>
    );
  });

  return (
    <div className="flex flex-col p-4 w-56 min-w-[14rem] bg-neutral-100 divide-neutral-600">
      <nav className="overflow-auto">
        <ul className=" flex flex-col">{linksList}</ul>
      </nav>
      <div className="grow" />
      <span className="text-center block w-full text-sm">Wayo 0.1.0</span>
    </div>
  );
}
