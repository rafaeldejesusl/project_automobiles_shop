import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Admins')
export class Admin {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  type: string;

  @Column()
  email: string;

  @Column()
  password: string;
}