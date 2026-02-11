"use client";

import React, { useState } from "react";
import ChatWelcomeTabs from "./ChatWelcomeTabs";
import ChatMessageForm from "./chat-message-form";

const ChatMessageView = ({ user }) => {
  const [selectMessages, setSelectMessages] = useState("");
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-10">
      <ChatWelcomeTabs
        username={user?.name}
        onMessageSelect={(message) => {
          setSelectMessages(message);
        }}
      />

      <ChatMessageForm 
       initialMessage={selectMessages}
       onMessageChange={(message) => {
        setSelectMessages(message);
      }}
      />
    </div>
  );
};

export default ChatMessageView;
