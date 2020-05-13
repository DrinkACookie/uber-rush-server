import * as bcrypt from "bcrypt";
import { IsEmail } from "class-validator";
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

import Chat from "./Chat";
import Message from "./Message";
import Ride from "./Ride";
import Verification from "./Verification";

const BCRYPT_ROUNDS = 10; //암호화를 10번 하겠다,

@Entity() //User라는 Class를 Entity decorator 안에 넣을 수 있도록 해 주는 것.
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number; //PrimaryKey 설정.

  @Column({ type: "text", unique: true })
  @IsEmail() //class-validator 를 이용하여 유효성 검사
  email: string;

  @Column({ type: "boolean", default: false })
  verifiedEmail: boolean;

  @Column({ type: "text" })
  firstName: string;

  @Column({ type: "text" })
  lastName: string;

  @Column({ type: "int" })
  age: number;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "text" })
  phoneNumber: string;

  @Column({ type: "boolean", default: false })
  verifiedPhonenNumber: boolean;

  @Column({ type: "text" })
  profilePhoto: string;
  @Column({ type: "boolean", default: false })
  isDriving: boolean;

  @Column({ type: "boolean", default: false })
  isRiding: boolean;

  @Column({ type: "boolean", default: false })
  isTaken: boolean;

  @Column({ type: "double precision", default: 0 })
  lastLng: number;

  @Column({ type: "double precision", default: 0 })
  lastLat: number;

  @Column({ type: "double precision", default: 0 })
  lastOrientation: number;

  @ManyToOne((type) => Chat, (chat) => chat.participants)
  chat: Chat;

  @OneToMany((type) => Message, (message) => message.user)
  messages: Message[];

  @OneToMany((type) => Verification, (verification) => verification.user)
  verifications: Verification[];

  @OneToMany((type) => Ride, (ride) => ride.passenger)
  ridesAsPassenger: Ride[];

  @OneToMany((type) => Ride, (ride) => ride.driver)
  ridesAsDriver: Ride[];

  //CreateDateColumn, UpdateDateColumn를 : TypeORM이 만들어 놓은 Column
  @CreateDateColumn() createdAt: string; //CreateDateColumn을 사용하여 만든 날을 저장

  @UpdateDateColumn() updatedAt: string; // UpdateDateColumn를 사용하여 수정된 날 저장

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
  //차후 resolver에서 사용할 함수.
  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  //save나 update 하기 전 실행되는 함수들.
  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
    }
  }
  //password bcrypt.
  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }
}

export default User;
