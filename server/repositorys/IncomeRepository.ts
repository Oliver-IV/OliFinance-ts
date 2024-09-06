import { Between } from "typeorm";
import { connection } from "../connection";
import Income from "../entitys/Income";
import User from "../entitys/User";
import IIncomeRepository from "../interfaces/repository/IIncomeRepository";
import { RepositoryError } from "../errors/RepositoryError";

export default class IncomeRepository implements IIncomeRepository {

    constructor() {
        this.initializeConnection() ;
    }

    private async initializeConnection() {
        if(!connection.isInitialized) {
            await connection.initialize();
        }
    }

    async addIncome(income: Income): Promise<Income> {
        try {
            const repoIncomes = connection.getRepository(Income) ;

            return await repoIncomes.save(income) ;
        } catch (error) {
            throw new RepositoryError("There's an error with the connection...") ;
        }
    }
    
    async findIncomes(user:User, start: Date, end: Date): Promise<Income[] | null> {
        try {
            const repoIncomes = connection.getRepository(Income) ;

            const incomes = await repoIncomes.find({
                where: {
                    date: Between(start, end) ,
                    user: user
                },
                relations: ["user"]
            }) ;

            return incomes ;
        } catch (error) {
            throw new RepositoryError("There's an error with the connection...") ;
        }
    }

}