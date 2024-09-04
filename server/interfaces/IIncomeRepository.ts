import Income from "../entitys/Income";

export default interface IIncomeRepository {

    addIncome(email:string, expense:Income):Income ;

    findIncomes(start:Date, end:Date):Income[] ;

}