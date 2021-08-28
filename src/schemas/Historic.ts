import {
  Entity,
  Column,
  ObjectID,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Paycheck } from '../entities/Paycheck';
import { Category } from '../entities/Category';
import { Habit } from '../entities/Habit';
import { Profit } from '../entities/Profit';
import { Expense } from '../entities/Expense';

@Entity('historic')
export class Historic {
  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  action: string;

  @Column()
  entity_name: string;

  @Column()
  user: string;

  @Column()
  entity: Paycheck | Category | Habit | Profit | Expense;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
