import IncomeDTO from "../dtos/IncomeDTO";
import { RepositoryError } from "../errors/RepositoryError";
import { ServiceError } from "../errors/ServiceError";
import IIncomeRepository from "../interfaces/repository/IIncomeRepository";
import IUserRepository from "../interfaces/repository/IUserRepository";
import IIncomeService from "../interfaces/service/IIncomeService";
import IConverter from "../interfaces/utils/IConverter";
import IncomeRepository from "../repositorys/IncomeRepository";
import UserRepository from "../repositorys/UserRepository";
import Converter from "../utils/Converter";

export default class IncomeService implements IIncomeService {
    
    private userRepository:IUserRepository ;
    private incomeRepository:IIncomeRepository ;
    private c:IConverter ;

    constructor() {
        this.userRepository = new UserRepository() ;
        this.incomeRepository = new IncomeRepository() ;
        this.c = new Converter() ;
    }

    async addIncome(email: string, income: IncomeDTO): Promise<IncomeDTO> {
        try {
            const userToAdd = await this.userRepository.findUserByEmail(email) ;
            const incomeToAdd = this.c.incomeDtoToEntity(income) ;

            if(userToAdd) {
                userToAdd.wallet = userToAdd.wallet + incomeToAdd.amount ;
                incomeToAdd.user = userToAdd ;

                return this.c.incomeEntityToDto(await this.incomeRepository.addIncome(incomeToAdd)) ;
            } else {
                throw new RepositoryError("There's an error adding your incomes...") ;
            }
        } catch (error) {
            if(error instanceof RepositoryError) {
                throw new ServiceError(error.message) ;
            } else {
                throw new ServiceError("There's a problem with the connection...") ;
            }
        }
    }
    async findIncomes(email: string, start: Date, end: Date): Promise<IncomeDTO[] | null> {
        try {
            const findedUser = await this.userRepository.findUserByEmail(email) ;
            
            if(findedUser) {
                return this.c.listIncomeEntityToDto(await this.incomeRepository.findIncomes(findedUser, start, end) || []) ;
            } else {
                throw new RepositoryError("There's an error getting your incomes...") ;
            }
        } catch (error) {
            if(error instanceof RepositoryError) {
                throw new ServiceError(error.message) ;
            } else {
                throw new ServiceError("There's a problem with the connection...") ;
            }
        }
    }

}