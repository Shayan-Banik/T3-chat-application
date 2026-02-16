"use client";

import React from "react";
import Model from "@/components/ui/model";
import { useDeleteChat } from "../hooks/chat";
import { toast } from "sonner";

const DeleteChat = ({ chatId, IsModelOpen, setIsModelOpen }) => {
  const { mutateAsync, isPending } = useDeleteChat(chatId);

  const handleDelete = async () => {
    try {
      await mutateAsync();
      toast.success("Chat deleted successfully");
      setIsModelOpen(false);
    } catch (error) {
      toast.error("Failed to delete chat");
    }
  };

  return (
    <Model
      title="Delete Chat"
      description="Are you sure you want to delete this chat?"
      isOpen={IsModelOpen}
      onClose={() => setIsModelOpen(false)}
      onSubmit={handleDelete}
      submitText={isPending ? "Deleting" : "Delete"}
      submitVariant="destructive"
      onConfirm={() => {
        toast.success("Chat deleted successfully");
      }}>
      <p className="text-sm text-muted-foreground">
        Once deleted, all requests and data in this chat will be permanently
        removed.
      </p>
    </Model>
  );
};

export default DeleteChat;