import Expense from "../../entitys/Expense";
import User from "../../entitys/User";

export default interface IExpenseRepository {

    addExpense(expense:Expense):Promise<Expense> ;

    findExpenses(user:User, start:Date, end:Date):Promise<Expense[]> ;

}