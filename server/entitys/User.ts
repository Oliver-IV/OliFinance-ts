import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Expense from "./Expense";
import Income from "./Income";
import Category from "./Category";

@Entity({name: "user"})
export default class User {

    @PrimaryGeneratedColumn({name: "id_user"})
    id ?: bigint ;

    @Column({name: "email", nullable: false, unique: true})
    email : string ;

    @Column({name: "password", nullable: false})
    password : string ;

    @Column({name: "name", nullable: false})
    name : string ;

    @Column({name: "last_name", nullable: false})
    last_name : string ;

    @Column({name: "wallet"})
    wallet : number ;

    // @OneToMany(() => Expense, expense => expense.user)
    // expenses ?: Expense[] ;

    // @OneToMany(() => Income, income => income.user)
    // incomes ?: Income[] ;

    @ManyToMany(() => Category, {cascade: true})
    @JoinTable({
        name: 'user_categories',
        joinColumn: {
            name: 'id_user',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'id_category',
            referencedColumnName: 'id',
        },
    })
    categories ?: Category[] ;

    // constructor(email:string, password:string, name:string, last_name:string, wallet?:number, expenses?:Expense[], incomes?:Income[], categories?:Category[], id?:bigint) {
    //     this.email = email ;
    //     this.password = password ;
    //     this.name = name ;
    //     this.last_name = last_name ;
    //     this.wallet = wallet || 0;
    //     this.expenses = expenses;
    //     this.incomes = incomes
    //     this.categories = categories ;
    //     this.id = id ;
    // }

    constructor(email:string, password:string, name:string, last_name:string, wallet?:number, categories?:Category[], id?:bigint) {
        this.email = email ;
        this.password = password ;
        this.name = name ;
        this.last_name = last_name ;
        this.wallet = wallet || 0 ;
        this.categories = categories ;
        this.id = id ;
    }
}