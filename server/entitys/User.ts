import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Expense from "./Expense";
import Income from "./Income";
import Category from "./Category";

@Entity({name: "user"})
export default class User {

    @PrimaryGeneratedColumn({name: "id_user"})
    id ?: bigint ;

    @Column({name: "email"})
    email : string ;

    @Column({name: "password"})
    password : string ;

    @Column({name: "name"})
    name : string ;

    @Column({name: "last_name"})
    last_name : string ;

    @Column({name: "wallet"})
    wallet : number ;

    @OneToMany(() => Expense, expense => expense.user, {cascade: true})
    expenses ?: Expense[] ;

    @OneToMany(() => Income, income => income.user, {cascade: true})
    incomes ?: Income[] ;

    @ManyToMany(() => Category, {cascade: true})
    @JoinTable({
        name: 'user_categories',
        joinColumn: {
            name: 'id_user',
            referencedColumnName: 'id_user',
        },
        inverseJoinColumn: {
            name: 'id_category',
            referencedColumnName: 'id_category',
        },
    })
    categories : Category[] ;

    constructor(email:string, password:string, name:string, last_name:string, wallet?:number, expenses?:Expense[], incomes?:Income[], id?:bigint) {
        this.email = email ;
        this.password = password ;
        this.name = name ;
        this.last_name = last_name ;
        this.wallet = wallet || 0;
        this.expenses = expenses;
        this.incomes = incomes
    }

}