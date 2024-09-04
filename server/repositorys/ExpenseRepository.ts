import Expense from "../entitys/Expense";
import IExpenseRepository from "../interfaces/IExpenseRepository";

export default class ExpenseRepository implements IExpenseRepository {
    
    addExpense(email: string, expense: Expense): Expense {
        throw new Error("Method not implemented.");
    }
    findExpenses(start: Date, end: Date): Expense[] {
        throw new Error("Method not implemented.");
    }

}