import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  TV1 = 'tv1',
  TV2 = 'tv2',
  TV3 = 'tv3',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.TV1 })
  role: UserRole;
}
