import {
  Entity,
  Column,
  ObjectID,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
