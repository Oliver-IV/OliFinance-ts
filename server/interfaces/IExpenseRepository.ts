import Expense from "../entitys/Expense";

export default interface IExpenseRepository {

    addExpense(expense:Expense):Promise<Expense> ;

    findExpenses(start:Date, end:Date):Promise<Expense[]> ;

}