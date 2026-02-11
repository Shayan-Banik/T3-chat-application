"use client";
import React, { useState } from "react";
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

const ChatSidebar = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState("");

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
        <div className="text-center text-sm text-muted-foreground py-8">
          No Chats Yet
        </div>
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
