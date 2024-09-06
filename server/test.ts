import "reflect-metadata";
import User from "./entitys/User";
import UserRepository from "./repositorys/UserRepository";
import { connection } from "./connection";
import CategoryRepository from "./repositorys/CategoryRepository";
import Category from "./entitys/Category";
import ExpenseRepository from "./repositorys/ExpenseRepository";
import Expense from "./entitys/Expense";
import IncomeRepository from "./repositorys/IncomeRepository";
import Income from "./entitys/Income";

async function init() {
    await connection.initialize() ;
    const repo = new UserRepository() ;
    const repo2 = new CategoryRepository() ;
    const repo3 = new ExpenseRepository() ;
    const repo4 = new IncomeRepository() ;

    //console.log(await repo.save(new User("olipotro@gmail.com", "contrasenia", "oliver", "valle"))) ;

    const user = await repo.findUserByEmail("olipotro@gmail.com") ;

    if(user) {
        //await repo4.addIncome(new Income(new Date(), 1000, user)) ;
        //console.log(await repo4.findIncomes(user, new Date(2024, 5, 10), new Date(2025, 1, 10))) ;
    }

    

    console.log(await repo.findUserByEmail("olipotro@gmail.com")) ;

    // const category = await repo2.findCategoryByName("hogar");

    // user?.categories?.push(category) ;

    // if(user != null) {
    //     await repo.updateUser(user) ;
    //     console.log("Se agrego la categoria") ;
    // } else {
    //     console.log("No hay usuario") ;
    // }
        
}

init() ;