import { type Message, type InsertMessage, messages } from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  createContactMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async createContactMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db
      .insert(messages)
      .values(insertMessage)
      .returning();
    return message;
  }
}

export const storage = new DatabaseStorage();
