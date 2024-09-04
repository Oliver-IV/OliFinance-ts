import { Between } from "typeorm";
import { connection } from "../Connection";
import Income from "../entitys/Income";
import User from "../entitys/User";
import { ServiceError } from "../errors/ServiceError";
import IIncomeRepository from "../interfaces/IIncomeRepository";

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
            throw new ServiceError("There's an error with the connection...") ;
        }
    }
    
    async findIncomes(start: Date, end: Date): Promise<Income[]> {
        try {
            const repoIncomes = connection.getRepository(Income) ;

            const incomes = await repoIncomes.find({
                where: {
                    date: Between(start, end) 
                }
            }) ;

            if(incomes != null) {
                return incomes ;
            }

            throw new ServiceError("There are no incomes") ;
        } catch (error) {
            if(error instanceof ServiceError) {
                throw error ;
            }
            throw new ServiceError("There's an error with the connection...") ;
        }
    }

}