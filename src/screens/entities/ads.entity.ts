import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Screen } from "./screen.entity";

@Entity()
export class Ads {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    //Media Column
    @Column()
    mediaUrl: string;

    @Column()
    duration: number;

    @Column()
    slot: string;

    @CreateDateColumn()
    startDate: Date;

    @CreateDateColumn()
    endDate: Date;

    constructor(partial: Partial<Ads>){
        Object.assign(this, partial);
    }
}