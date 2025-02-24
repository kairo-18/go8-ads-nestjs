import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, CreateDateColumn } from 'typeorm';
import { Screen } from 'src/screens/entities/screen.entity';

@Entity()
export class Announcement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column()
  flightNumber: string;

  @Column({ nullable: true })
  gate?: string;

  @Column()
  duration: number; // In seconds

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: false })  // New field to track active status
  active: boolean;

  @ManyToMany(() => Screen, (screen) => screen.announcements, { cascade: true })
  @JoinTable()
  screens: Screen[];  

  
  @Column()
  announcementType: string;

}
