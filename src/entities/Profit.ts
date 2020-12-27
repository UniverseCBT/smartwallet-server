import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Paycheck } from './Paycheck';

@Entity('profit')
export class Profit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  notes: string;

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
