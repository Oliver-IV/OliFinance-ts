import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";

@Entity({name: "category"})
export default class Category {
    
    @PrimaryGeneratedColumn({name: "id_category"})
    id ?: bigint ;

    @Column({name: "name", nullable: false, unique: true})
    name : string ;

    constructor(name:string, user?:User, id?:bigint) {
        this.id = id ;
        this.name = name ;
    }
}