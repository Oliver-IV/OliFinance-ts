import IncomeDTO from "../../dtos/IncomeDTO";

export default interface IIncomeService {

    addIncome(email:string, income:IncomeDTO):Promise<IncomeDTO> ;

    findIncomes(email: string, start:Date, end:Date):Promise<IncomeDTO[] | null> ;

}