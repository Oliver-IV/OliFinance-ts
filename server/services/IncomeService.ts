import IncomeDTO from "../dtos/IncomeDTO";
import IIncomeService from "../interfaces/service/IIncomeService";

export default class IncomeService implements IIncomeService {
    
    addIncome(income: IncomeDTO): Promise<IncomeDTO> {
        throw new Error("Method not implemented.");
    }
    findIncomes(start: Date, end: Date): Promise<IncomeDTO[]> {
        throw new Error("Method not implemented.");
    }

}