import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Entity,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Category } from './Category';
import { User } from './User';

@Entity('habits')
export class Habit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  habit_name: string;

  @Column('smallint')
  importance: number;

  @Column('decimal', { precision: 10, scale: 2 })
  expected_spent: number;

  @Column('decimal', { precision: 10, scale: 2 })
  current_spent: number;

  @Column('decimal', { precision: 10, scale: 2 })
  available: number;

  @Column()
  category_id: string;

  @ManyToOne(() => Category, category => category, {
    eager: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Exclude()
  @Column()
  user_id: string;

  @Exclude()
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
