import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  email: string;

  @Column()
  password: string;
}