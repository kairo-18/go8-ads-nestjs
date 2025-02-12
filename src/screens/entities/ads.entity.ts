import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
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

    constructor(partial: Partial<Ads>){
        Object.assign(this, partial);
    }
}