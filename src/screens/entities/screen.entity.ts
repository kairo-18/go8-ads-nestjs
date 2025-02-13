import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ads } from './ads.entity';

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
}
