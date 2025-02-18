import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";

@Entity({name: "income"})
export default class Income {

    @PrimaryGeneratedColumn({name: "id_income"})
    id ?: bigint ;

    @Column({name: "amount", nullable: false})
    amount : number ;

    @Column({name: "title", nullable: true})
    title : string ;

    @Column({name: "date", nullable: false})
    date : Date ;

    @ManyToOne(() => User, {cascade: ["insert", "update"]})
    user ?: User ;

    constructor(date:Date, amount:number, title:string, user?:User, id?:bigint) {
        this.date = date ;
        this.amount = amount ;
        this.title = title ;
        this.user = user ;
        this.id = id ;
    }

}