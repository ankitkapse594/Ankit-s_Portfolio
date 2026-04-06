import { type Message, type InsertMessage } from "@shared/schema";
import { supabase } from "./supabase";

export interface IStorage {
  createContactMessage(message: InsertMessage): Promise<Message>;
}

export class SupabaseStorage implements IStorage {
  async createContactMessage(insertMessage: InsertMessage): Promise<Message> {
    const { data, error } = await supabase
      .from("messages")
      .insert({
        name: insertMessage.name,
        email: insertMessage.email,
        message: insertMessage.message,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Message;
  }
}

export const storage = new SupabaseStorage();
