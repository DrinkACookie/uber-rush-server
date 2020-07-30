import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  RelationId,
} from "typeorm";

import Chat from "./Chat";

import User from "./User";

@Entity()
class Message extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  text: string;

  @RelationId((message: Message) => message.chat)
  chatId: number;

  @ManyToOne((type) => Chat, (chat) => chat.messages)
  chat: Chat;

  @RelationId((message: Message) => message.user)
  userId: number;

  @ManyToOne((type) => User, (user) => user.messages)
  user: User;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}
export default Message;
