"use client"

import { Chat } from "@/components/Chat";

export const dynamicParams = true 

export async function generateStaticParams() {
  return [];
}

export default function ChatPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <Chat id={id} />
    </>
  );
}
