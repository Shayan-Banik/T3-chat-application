"use client";
import React, { Fragment, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  PlusIcon,
  SearchIcon,
  MenuIcon,
  EllipsisIcon,
  Trash,
} from "lucide-react";
import Image from "next/image";
import UserButton from "../../authentication/components/user-button";
import { useChatStore } from "../store/chat-store";
import DeleteChat from "./chat-delete";

const ChatSidebar = ({ user, chats }) => {
  const { activeChatId } = useChatStore();

  const [IsModelOpen, setIsModelOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChat = useMemo(() => {
    if (!searchQuery) return chats;
    return chats.filter(
      (chat) =>
        chat.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.messages?.some((message) =>
          message.content?.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );
  }, [chats, searchQuery]);

  const onDelete = (e, chatId) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedChatId(chatId);
    setIsModelOpen(true);
  };

  const renderChatList = (chatList) => {
    if (chatList.length === 0) return null;

    return chatList.map((chat) => (
      <Fragment key={chat.id}>
        <Link
          href={`/chat/${chat.id}`}
          key={chat.id}
          className={cn(
            "block rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
            activeChatId === chat.id && "bg-sidebar-accent",
          )}>
          <div className="flex flex-row justify-between items-center gap-2">
            <span className="truncate flex-1">{chat.title}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 group-hover:opacity-100 hover:bg-sidebar-accent-foreground/10"
                  onClick={(e) => e.preventDefault()}>
                  <EllipsisIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex flex-row gap-2 cursor-pointer"
                  onClick={(e) => onDelete(e, chat.id)}>
                  <Trash className="h-4 w-4 text-red-500" />
                  <span className="text-red-500">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Link>
        <DeleteChat
          chatId={chat.id}
          IsModelOpen={IsModelOpen}
          setIsModelOpen={setIsModelOpen}
        />
      </Fragment>
    ));
  };

  return (
    <div className="flex h-full w-64 flex-col border-r border-border bg-sidebar">
      <div className="flex items-center justify-between border-b border-sidebar px-4 py-4">
        <div className="flex items-center gap-2">
          <Image src={"/logo.svg"} alt="logo" width={100} height={100} />
        </div>
      </div>
      <div className="p-4">
        <Link href={"/"}>
          <Button className="w-full">
            <PlusIcon className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </Link>
      </div>

      <div className="px-4 pb-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2" />
          <Input
            placeholder="Search your chat"
            className="pl-8 bg-sidebar-accent border-sidebar-b pr-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2">
        {filteredChat.length > 0 ? (
          renderChatList(filteredChat)
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <MenuIcon className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">No chat found</span>
          </div>
        )}
      </div>

      <div className="p-4 flex items-center gap-3 border-t border-sidebar-border">
        <UserButton user={user} />
        <span className="flex-1 text-sm text-sidebar-foreground truncate">
          {user.email}
        </span>
      </div>
    </div>
  );
};

export default ChatSidebar;
