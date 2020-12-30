import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Habit } from './Habit';

@Entity('profit')
export class Profit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  notes: string;

  @Column()
  habit_id: string;

  @OneToOne(() => Habit, habit => habit, {
    eager: true,
  })
  @JoinColumn({ name: 'habit_id' })
  habit: Habit;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
