import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";

@Entity({name: "expense"})
export default class Expense {

    @PrimaryGeneratedColumn({name: "id_expense"})
    id ?: bigint ;

    @Column({name: "amount"})
    amount : number ;

    @Column({name: "date"})
    date : Date ;

    @Column({name: "title"})
    title : string ;

    @Column({name: "note"})
    note : string ;

    

    @ManyToOne(() => User, user => user.expenses)
    user : User ;

}