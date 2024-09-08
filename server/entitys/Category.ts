import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "category"})
export default class Category {
    
    @PrimaryGeneratedColumn({name: "id_category"})
    id ?: bigint ;

    @Column({name: "name", nullable: false, unique: true})
    name : string ;

    constructor(name:string, id?:bigint) {
        this.id = id ;
        this.name = name ;
    }
}