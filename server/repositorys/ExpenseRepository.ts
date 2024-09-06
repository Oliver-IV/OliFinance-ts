import { Between } from "typeorm";
import { connection } from "../connection";
import Expense from "../entitys/Expense";
import { ServiceError } from "../errors/ServiceError";
import IExpenseRepository from "../interfaces/repository/IExpenseRepository";
import User from "../entitys/User";

export default class ExpenseRepository implements IExpenseRepository {

    constructor() {
        this.initializeConnection() ;
    }

    private async initializeConnection() {
        if(!connection.isInitialized) {
            await connection.initialize();
        }
    }

    async addExpense(expense: Expense): Promise<Expense> {
        try {
            const repoExpenses = connection.getRepository(Expense) ;

            return await repoExpenses.save(expense) ;
        } catch (error) {
            throw new ServiceError("There's an error with the connection...") ;
        }
    }
    
    async findExpenses(user:User, start: Date, end: Date): Promise<Expense[]> {
        try {
            const repoExpenses = connection.getRepository(Expense) ;

            const expenses = await repoExpenses.find({
                where: {
                    date: Between(start, end),
                    user: user 
                },
                relations: ["user", "category"]
            }) ;

            if(expenses != null) {
                return expenses ;
            }

            throw new ServiceError("There are no expenses") ;
        } catch (error) {
            if(error instanceof ServiceError) {
                throw error ;
            }
            throw new ServiceError("There's an error with the connection...") ;
        }
    }

}