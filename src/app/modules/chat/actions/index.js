"use server";

import db from "@/lib/db";
import { MessageRole, MessageType } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { currentUser } from "../../authentication/actions";

export const createChatWithMessage = async (values) => {
  try {
    const user = await currentUser();

    if (!user)
      return {
        success: false,
        message: "Unauthorized",
      };

    const { content, model } = values;
    if (!content || !content.trim())
      return {
        success: false,
        messages: "Message content is required",
      };

    const title = content.slice(0, 50) + (content.length > 50 ? "..." : "");

    const chat = await db.chat.create({
      data: {
        title,
        model,
        userId: user.id,
        messages: {
          create: {
            content,
            messageRole: MessageRole.USER,
            messageType: MessageType.NORMAL,
            model,
          },
        },
      },
      include: {
        messages: true,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Chat created successfully",
      data: chat,
    };
  } catch (error) {
    console.error("Error creating chat:", error);
    return {
      success: false,
      message: "Error creating chat",
    };
  }
};

export const getAllChats = async () => {
  try {
    const user = await currentUser();

    if (!user)
      return {
        success: false,
        message: "Unauthorized",
      };

    const chat = await db.chat.findMany({
      where: {
        userId: user.id,
      },
      include: {
        messages: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      message: "Chats fetched successfully",
      data: chat,
    };
  } catch (error) {
    console.error("Error fetching chats:", error);
    return {
      success: false,
      message: "Error fetching chats",
    };
  }
};

export const getChatById = async (chatId) => {
  try {
    const user = await currentUser();

    if (!user)
      return {
        success: false,
        message: "Unauthorized",
      };

    const chat = await db.chat.findUnique({
      where: {
        id: chatId,
        userId: user.id,
      },
      include: {
        messages: true,
      },
    });

    return {
      success: true,
      message: "Chat fetched successfully",
      data: chat,
    };
  } catch (error) {
    console.error("Error fetching chat:", error);
    return {
      success: false,
      message: "Error fetching chat",
    };
  }
};

export const deleteChat = async (chatId) => {
  try {
    const user = await currentUser();

    if (!user)
      return {
        success: false,
        message: "Unauthorized",
      };

    const chat = await db.chat.findUnique({
      where: {
        id: chatId,
        userId: user.id,
      },
    });

    if (!chat) {
      return {
        success: false,
        message: "Chat not found",
      };
    }

    await db.chat.delete({
      where: {
        id: chatId,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Chats deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting chats:", error);
    return {
      success: false,
      message: "Error deleting chats",
    };
  }
};
