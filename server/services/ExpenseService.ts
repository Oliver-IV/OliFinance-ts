import ExpenseDTO from "../dtos/ExpenseDTO";
import IExpenseService from "../interfaces/service/IExpenseService";

export default class ExpenseService implements IExpenseService {
    
    addExpense(expense: ExpenseDTO): Promise<ExpenseDTO> {
        throw new Error("Method not implemented.");
    }
    findExpenses(start: Date, end: Date): Promise<ExpenseDTO[]> {
        throw new Error("Method not implemented.");
    }

}