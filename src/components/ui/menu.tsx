"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/lib/hooks";
import { selectChats } from "@/lib/features/chat/selectors";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const chats = useAppSelector(selectChats);

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          <li className={cn("w-full", false ? "pt-5" : "")}>
            {chats.map((chat, index) => (
              <div className="w-full" key={index}>
                <Button
                  variant={true ? "secondary" : "ghost"}
                  className="w-full justify-start h-10 mb-1"
                  asChild
                >
                  <Link href={chat.id}>
                    <p
                      className={cn(
                        "max-w-[200px] truncate",
                        isOpen === false
                          ? "-translate-x-96 opacity-0"
                          : "translate-x-0 opacity-100"
                      )}
                    >
                      {chat.title}
                    </p>
                  </Link>
                </Button>
              </div>
            ))}
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}
