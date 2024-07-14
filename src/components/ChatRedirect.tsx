"use client";

import {
  Card,
  CardContent,
} from "./ui/card";
import { useEffect } from "react";

import { useAppDispatch } from "@/lib/hooks";

import { v4 } from "uuid";

import { setCurrentChatId } from "@/lib/features/chat/slice";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader } from "./ui/loader";

export interface ChatRedirectProps {}

export function ChatRedirect(props: ChatRedirectProps) {
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const id = params.get("id");
    if (id) {
      dispatch(setCurrentChatId(id));
    } else {
      const id = v4();
      dispatch(setCurrentChatId(id));
      router.push(id);
    }
  }, [params]);

  return (
    <Card className="bg-white w-[600px] h-[750px] grid grid-rows-[min-content_1fr_min-content]">
      <CardContent className="py-10 space-y-4">
        <div className="w-full flex-col gap-8 h-[220px] flex">
          <h1 className="font-bold text-2xl">Chat HR</h1>
          <h3>AI Chatbot specialized in HR questions related to the UK.</h3>
          <h3>
            Try asking: <i>What is the minimum wage?</i>
          </h3>
        </div>
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      </CardContent>
    </Card>
  );
}
