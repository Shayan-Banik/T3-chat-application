import React from "react";
import ActiveChatLoader from "@/app/modules/messages/components/ActiveChatLoader";
import MessageWithForm from "@/app/modules/messages/components/MessageWithForm";

const Page = async ({ params }) => {
  const { chatId } = await params;
  return (
    <>
      <ActiveChatLoader chatId={chatId} />
      <MessageWithForm chatId={chatId} />
    </>
  );
};

export default Page;
