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
import UserService from "./services/UserService";
import UserDTO from "./dtos/UserDTO";
import ExpenseService from "./services/ExpenseService";
import ExpenseDTO from "./dtos/ExpenseDTO";
import CategoryDTO from "./dtos/CategoryDTO";
import IncomeService from "./services/IncomeService";
import IncomeDTO from "./dtos/IncomeDTO";
import CategoryService from "./services/CategoryService";

async function init() {
    await connection.initialize() ;
    // const repo = new UserRepository() ;
    // const repo2 = new CategoryRepository() ;
    // const repo3 = new ExpenseRepository() ;
    // const repo4 = new IncomeRepository() ;
    const service = new UserService() ;
    const service2 = new ExpenseService() ;
    const service3 = new IncomeService() ;
    const service4 = new CategoryService() ;

    //console.log(await repo.save(new User("olipotro@gmail.com", "contrasenia", "oliver", "valle"))) ;

    //const user = await repo.findUserByEmail("olipotro@gmail.com") ;

    // if(user) {
        //await repo4.addIncome(new Income(new Date(), 1000, user)) ;
        //console.log(await repo4.findIncomes(user, new Date(2024, 5, 10), new Date(2025, 1, 10))) ;
    // }

    

    // console.log(await repo.findUserByEmail("olipotro@gmail.com")) ;

    // const category = await repo2.findCategoryByName("hogar");

    // user?.categories?.push(category) ;

    // if(user != null) {
    //     await repo.updateUser(user) ;
    //     console.log("Se agrego la categoria") ;
    // } else {
    //     console.log("No hay usuario") ;
    // }

    
    //await service.addUser(new UserDTO("elcompaoli@gmail.com", "guasave777", "oliver", "valle")) ;
    //console.log(await service.login("elcompaoli@gmail.com", "guasave777")) ;
    // await service2.addExpense("elcompaoli@gmail.com", new ExpenseDTO(2000, new Date(), "Audifonos", "Audifonos PULSE 3D nuevos", new CategoryDTO("Tecnologia"))) ;
    //console.log(await service2.findExpenses("elcompaoli@gmail.com", new Date(2024, 5, 10), new Date(2025, 1, 10))) ;

    // await service3.addIncome("elcompaoli@gmail.com", new IncomeDTO(500, new Date())) ;

    // console.log(await service3.findIncomes("elcompaoli@gmail.com", new Date(2024, 5, 10), new Date(2025, 1, 10))) ;

    //  await service4.addCategoryForUser("elcompaoli@gmail.com", new CategoryDTO("Hogar")) ;
    await service4.removeCategory("elcompaoli@gmail.com", new CategoryDTO("hogar")) ;
     console.log(await service4.findUserCategories("elcompaoli@gmail.com")) ;

    // console.log(await service4.findCategoryByName("familia")) ;
}

init() ;