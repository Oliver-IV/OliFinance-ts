import { Between } from "typeorm";
import { connection } from "../connection";
import Expense from "../entitys/Expense";
import IExpenseRepository from "../interfaces/repository/IExpenseRepository";
import User from "../entitys/User";
import { RepositoryError } from "../errors/RepositoryError";

export default class ExpenseRepository implements IExpenseRepository {

    constructor() {
    }

    async addExpense(expense: Expense): Promise<Expense> {
        try {
            const repoExpenses = connection.getRepository(Expense) ;

            return await repoExpenses.save(expense) ;
        } catch (error) {
            throw new RepositoryError("There's an error with the connection...") ;
        }
    }
    
    async findExpenses(user:User, start: Date, end: Date): Promise<Expense[] | null> {
        try {
            const repoExpenses = connection.getRepository(Expense) ;

            const expenses = await repoExpenses.find({
                where: {
                    date: Between(start, end),
                    user: user 
                },
                relations: ["user", "category"]
            }) ;

            return expenses ;
        } catch (error) {
            throw new RepositoryError("There's an error with the connection...") ;
        }
    }

}