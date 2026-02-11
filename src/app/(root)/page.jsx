import React from "react";
import { currentUser } from "../modules/authentication/actions";
import ChatMessageView from "../modules/chat/components/chat-message-view";

const Home = async () => {
  const user = await currentUser();

  return (
    <ChatMessageView user={user} />
  );
};

export default Home;
