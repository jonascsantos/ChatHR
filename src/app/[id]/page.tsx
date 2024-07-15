"use client"

import { Chat } from "@/components/Chat";

export const dynamicParams = true 

export default function ChatPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <Chat id={id} />
    </>
  );
}
