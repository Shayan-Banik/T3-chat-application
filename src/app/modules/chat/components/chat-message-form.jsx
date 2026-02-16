"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import ModelSelector from "./model-selector";
import { useAIModels } from "../../ai-agents/hooks/ai-agent";
import { useCreateChat } from "../hooks/chat";
import { toast } from "sonner";

const ChatMessageForm = ({ initialMessage, onMessageChange }) => {
  const { data: models, isPending } = useAIModels();

  const [message, setMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState(null);

  const { mutateAsync, isPending: isChatPending } = useCreateChat();

  useEffect(() => {
    if (initialMessage) {
      // setMessage(initialMessage);
      onMessageChange?.("");
    }
  }, [initialMessage, onMessageChange]);

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      await mutateAsync({
        content: message,
        model: selectedModel,
      });
      toast.success("Message sent successfully");
    } catch (error) {
      console.log("Error sending message:");
      toast.error("Failed to send message");
    } finally {
      setMessage("");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-6">
      <form onSubmit={handleFormSubmit} className="relative">
        <div className="relative rounded-2xl border border-border shadow-sm   transition-all">
          {/* Textarea */}
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="min-h-15 max-h-50 resize-none border-0 bg-transparent px-4 py-3 text-base focus-visible:ring-0 focus-visible:ring-offset-0 "
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleFormSubmit(e);
              }
            }}
          />

          <div className="flex items-center justify-between gap-2 px-3 py-2 border-t ">
            <div className="flex items-center gap-1">
              {isPending ? (
                <>
                  <Spinner />
                </>
              ) : (
                <ModelSelector
                  models={models?.models}
                  selectedModelId={selectedModel}
                  onModelSelect={setSelectedModel}
                  className="ml-1"
                />
              )}
            </div>

            <Button disabled={!message || isChatPending} type="submit">
              {isChatPending ? (
                <>
                  <Spinner />
                </>
              ) : (
                <>
                  <Send className="h-5 w-4" />
                  <span className="sr-only">Send</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatMessageForm;
