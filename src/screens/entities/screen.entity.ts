import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ads } from './ads.entity';
import { Announcement } from 'src/announcements/entities/announcement.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Screen {

    constructor(screen: Partial<Screen>){
        Object.assign(this, screen);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    routeName: string;

    @Column()
    layoutType: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToMany(() => Ads, {cascade: true})
    @JoinTable()
    ads: Ads[];

    @ManyToMany(() => Announcement, (announcement) => announcement.screens,{
        cascade:true,
        onDelete:"CASCADE",
    })
    announcements: Announcement[];

    @OneToOne(() => User, (user) => user.screen,{
        cascade:true,
        onDelete:"CASCADE"
    })
    user: User;
}
