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
import { Paycheck } from './Paycheck';

@Entity('profit')
export class Profit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  notes: string;

  @Column('decimal', { precision: 10, scale: 2 })
  value: number;

  @Column()
  habit_id: string;

  @OneToOne(() => Habit, habit => habit, {
    eager: true,
  })
  @JoinColumn({ name: 'habit_id' })
  habit: Habit;

  @Column()
  paycheck_id: string;

  @OneToOne(() => Paycheck, paycheck => paycheck, {
    eager: true,
  })
  @JoinColumn({ name: 'paycheck_id' })
  paycheck: Paycheck;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
