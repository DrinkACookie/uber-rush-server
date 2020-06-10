import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  RelationId,
  OneToOne,
} from "typeorm";

import Messages from "./Message";

import User from "./User";
import Ride from "./Ride";

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @OneToMany((type) => Messages, (messages) => messages.chat)
  messages: Messages[];

  @RelationId((chat: Chat) => chat.ride)
  rideId: number;

  @OneToOne((type) => Ride, (ride) => ride.chat)
  ride: Ride;

  @RelationId((chat: Chat) => chat.passenger)
  passengerId: number;

  @ManyToOne((type) => User, (user) => user.chatsAsPassenger)
  passenger: User;

  @RelationId((chat: Chat) => chat.driver)
  driverId: number;

  @ManyToOne((type) => User, (user) => user.chatsAsDriver)
  driver: User;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}
export default Chat;
