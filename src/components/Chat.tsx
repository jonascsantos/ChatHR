"use client";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useChat, Message as ReactAiMessageType } from "ai/react";
import { FormEvent, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  selectChats,
  selectChatById,
  selectChatMessagesById,
  selectCurrentChatId,
} from "@/lib/features/chat/selectors";
import { v4 } from "uuid";

import {
  addChat,
  addMessage,
  ChatType,
  Message,
} from "@/lib/features/chat/slice";
import { RootState } from "@/lib/store";
import { ScrollArea } from "./ui/scroll-area";
import { Loader } from "./ui/loader";

export interface ChatProps {
  id: string;
}

export function Chat(props: ChatProps) {
  const dispatch = useAppDispatch();
  const { id } = props;

  const currentChatId = useAppSelector(selectCurrentChatId);
  const chat = useAppSelector((state: RootState) => selectChatById(state, id));
  const chatMessages = useAppSelector((state: RootState) =>
    selectChatMessagesById(state, id)
  );

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
  } = useChat({
    api: "api/ask",
    streamMode: "text",
    onFinish: (message) => {
      const newMessage = {
        id: message.id,
        role: message.role,
        content: message.content,
        createdAt: (message.createdAt || new Date()).toString(),
      } as Message;
      dispatch(
        addMessage({
          chatId: currentChatId,
          message: newMessage,
        })
      );
    },
    initialMessages: chatMessages,
    id: currentChatId,
    sendExtraMessageFields: true,
  });

  useEffect(() => {
    setMessages((chat?.messages as ReactAiMessageType[]) || []);
  }, [currentChatId]);

  const chats = useAppSelector(selectChats);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    handleSubmit(event);

    const dateNow = new Date();

    if (!chats.find((chat) => chat.id === currentChatId)) {
      const newChat: ChatType = {
        id: currentChatId,
        lastUpdated: dateNow.toString(),
        title: "Chat " + currentChatId,
        messages: [
          {
            id: v4(),
            role: "user",
            content: input,
            createdAt: dateNow.toString(),
          },
        ] as Message[],
      };

      dispatch(addChat(newChat));
    } else {
      const newMessage = {
        id: v4(),
        role: "user",
        content: input,
        createdAt: dateNow.toString(),
      } as Message;
      dispatch(
        addMessage({
          chatId: currentChatId,
          message: newMessage,
        })
      );
    }
  };

  return (
    <Card className="bg-white w-[600px] h-[750px] grid grid-rows-[min-content_1fr_min-content]">
      
      <CardContent>
        <ScrollArea className="h-[630px] w-[540px] rounded-md">
          <div className="space-y-4 py-10">
            {messages.length === 0 && 
              <div className="w-full flex-col gap-8 h-[560px] flex">
                <h1 className="font-bold text-2xl">Chat HR</h1>
                <h3>AI Chatbot specialized in HR questions related to the UK.</h3>
                <h3>Try asking: <i>What is the minimum wage?</i></h3>
              </div>
            } 
            {messages.map((message) => {
              return (
                <div
                  key={message.id}
                  className="flex gap-4 text-slate-600 text-sm"
                >
                  {message.role === "user" && (
                    <Avatar>
                      <AvatarFallback>Me</AvatarFallback>
                      <AvatarImage src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-367-456319.png" />
                    </Avatar>
                  )}

                  {message.role === "assistant" && (
                    <Avatar>
                      <AvatarFallback>HR</AvatarFallback>
                      <AvatarImage src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" />
                    </Avatar>
                  )}
                  <p className="leading-relaxed">
                    <span className="block font-bold text-slate-700">
                      {message.role === "user" ? "Me" : "HR Assistant"}
                    </span>
                    {message.content}
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form className="w-full flex gap-2" onSubmit={onSubmit}>
          <Input
            placeholder="How can I help you?"
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="flex justify-center items-center min-w-10">
                  <Loader className="text-white h-5 w-5" />
                </div>
              </>
            ) : (
              "Send"
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
