import { ReactNode } from "react";
import SideBar from "@/src/components/Sidebar";
import ToolBar from "@/src/components/ToolBar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen max-w-screen-2xl mx-auto">
      <ToolBar />
      <div className="flex flex-row h-full overflow-hidden">
        <SideBar />
        <div className="px-4 pb-4 w-full h-full overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
