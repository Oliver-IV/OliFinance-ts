import IncomeDTO from "../../dtos/IncomeDTO";

export default interface IIncomeService {

    addIncome(income:IncomeDTO):Promise<IncomeDTO> ;

    findIncomes(start:Date, end:Date):Promise<IncomeDTO[]> ;

}