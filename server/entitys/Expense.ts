import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";
import Category from "./Category";

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

    @ManyToOne(() => Category)
    category : Category ;

    @ManyToOne(() => User, user => user.expenses)
    user ?: User ;

    constructor(date:Date, amount:number, title:string, note:string, category:Category, user?:User, id?:bigint) {
        this.date = date ;
        this.amount = amount ;
        this.title = title ;
        this.note = note ;
        this.category = category ;
        this.user = user ;
        this.id = id ;
    }

}