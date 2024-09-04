import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";

@Entity({name: "income"})
export default class Income {

    @PrimaryGeneratedColumn({name: "id_income"})
    id ?: bigint ;

    @Column({name: "amount"})
    amount : number ;

    @Column({name: "date"})
    date : Date ;

    @ManyToOne(() => User, user => user.incomes)
    user : User ;

}