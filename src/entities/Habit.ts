import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Category } from './Category';
import { User } from './User';

export class Habit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  habit_name: string;

  @Column('smallint')
  importance: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('uuid')
  category_id: string;

  @ManyToOne(() => Category, category => category, {
    eager: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => User, user => user)
  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
