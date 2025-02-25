import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Screen } from '../../screens/entities/screen.entity';

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

  @OneToOne(() => Screen, (screen) => screen.user, {  nullable: true, onDelete: "SET NULL" })
  @JoinColumn()
  screen: Screen;
}
