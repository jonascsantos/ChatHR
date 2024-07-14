"use client";

import Link from "next/link";
import { FilePenLine } from "lucide-react" 
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/ui/menu";
import { SidebarToggle } from "@/components/ui/sidebar-toggle";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useAppDispatch } from "@/lib/hooks";
import { toggleSidebar } from "@/lib/features/sidebar/slice";

export function Sidebar() {
  const dispatch = useAppDispatch();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  return (
    <aside
      className={cn(
        "bg-white fixed top-0 left-0 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        isOpen === false ? "w-[90px]" : "w-72"
      )}
    >
      <SidebarToggle
        isOpen={isOpen}
        setIsOpen={() => dispatch(toggleSidebar())}
      />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <div
          className={cn(
            "flex flex-col transition-transform ease-in-out duration-300 gap-6",
            isOpen === false ? "translate-x-1" : "translate-x-0 pl-6 "
          )}
        >
          <h1
            className={cn(
              "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
              isOpen === false
                ? "-translate-x-96 opacity-0 hidden"
                : "translate-x-0 opacity-100"
            )}
          >
            Chat HR
          </h1>
          <div className="flex">
            <Button
              asChild
            >
              <Link href={"/"}>
                <FilePenLine 
                className={cn(
                  "h-4 w-4",
                  isOpen ? "mr-2 " : ""
                )} /> {isOpen ? "New Chat" : "" }
              </Link>
            </Button>
          </div>
          <div>
            <h3
                className={cn(
                  "pt-6 text-sm whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                  isOpen === false
                    ? "-translate-x-96 opacity-0 hidden"
                    : "translate-x-0 opacity-100"
                )}
              >
              Chats history
            </h3>
          </div>
        </div>
       
        <Menu isOpen={isOpen} />
      </div>
    </aside>
  );
}
