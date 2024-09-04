import ExpenseDTO from "../../dtos/ExpenseDTO";

export default interface IExpenseService {

    addExpense(expense:ExpenseDTO):Promise<ExpenseDTO> ;

    findExpenses(start:Date, end:Date):Promise<ExpenseDTO[]> ;

}