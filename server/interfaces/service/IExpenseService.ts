import ExpenseDTO from "../../dtos/ExpenseDTO";

export default interface IExpenseService {

    addExpense(email:string, expense:ExpenseDTO):Promise<ExpenseDTO> ;

    findExpenses(email:string, start:Date, end:Date):Promise<ExpenseDTO[] | null> ;

}