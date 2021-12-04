/* eslint-disable import/no-extraneous-dependencies */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { User } from './User';

@Entity('users_tokens')
class UserTokens {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column()
  refresh_token: string;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;
}

export { UserTokens };
