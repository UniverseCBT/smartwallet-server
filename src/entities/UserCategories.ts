import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

import { User } from './User';
import { Category } from './Category';
import { Paycheck } from './Paycheck';

@Entity('user_categories')
export class UserCategories {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  total_expect: number;

  @Column('decimal', { precision: 10, scale: 2 })
  current_wallet: number;

  @ManyToOne(() => User, user => user, {
    eager: true,
  })
  user_id: string;

  @ManyToMany(() => Category, category => category, {
    eager: true,
  })
  category_id: string;

  @ManyToMany(() => Paycheck, paycheck => paycheck, {
    eager: true,
  })
  paycheck_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
