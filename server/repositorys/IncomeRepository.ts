import Income from "../entitys/Income";
import IIncomeRepository from "../interfaces/IIncomeRepository";

export default class IncomeRepository implements IIncomeRepository {
    
    addIncome(email: string, expense: Income): Income {
        throw new Error("Method not implemented.");
    }
    findIncomes(start: Date, end: Date): Income[] {
        throw new Error("Method not implemented.");
    }

}