import Expense from "../entitys/Expense";

export default interface IExpenseRepository {

    addExpense(email:string, expense:Expense):Expense ;

    findExpenses(start:Date, end:Date):Expense[] ;

}