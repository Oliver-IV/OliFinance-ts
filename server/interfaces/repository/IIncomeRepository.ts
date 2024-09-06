import Income from "../../entitys/Income";
import User from "../../entitys/User";

export default interface IIncomeRepository {

    addIncome(income:Income):Promise<Income> ;

    findIncomes(user:User, start:Date, end:Date):Promise<Income[] | null> ;

}