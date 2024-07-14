"use client"

import { ChatRedirect } from "@/components/ChatRedirect";
import { Sidebar } from "@/components/ui/sidebar";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";

export default function Home() {
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  return (
    <>
      <Sidebar />
      <main 
        className={cn(
          "flex justify-center items-center min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        <ChatRedirect />
      </main>
    </>
  );
}
