import Income from "../../entitys/Income";

export default interface IIncomeRepository {

    addIncome(income:Income):Promise<Income> ;

    findIncomes(start:Date, end:Date):Promise<Income[]> ;

}