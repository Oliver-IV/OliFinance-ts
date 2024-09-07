import ExpenseDTO from "../dtos/ExpenseDTO";
import Category from "../entitys/Category";
import { RepositoryError } from "../errors/RepositoryError";
import { ServiceError } from "../errors/ServiceError";
import ICategortRepository from "../interfaces/repository/ICategoryRepository";
import IExpenseRepository from "../interfaces/repository/IExpenseRepository";
import IUserRepository from "../interfaces/repository/IUserRepository";
import IExpenseService from "../interfaces/service/IExpenseService";
import IConverter from "../interfaces/utils/IConverter";
import CategoryRepository from "../repositorys/CategoryRepository";
import ExpenseRepository from "../repositorys/ExpenseRepository";
import UserRepository from "../repositorys/UserRepository";
import Converter from "../utils/Converter";

export default class ExpenseService implements IExpenseService {
    
    private userRepository:IUserRepository ;
    private expenseRepository:IExpenseRepository ;
    private categoryRepository:ICategortRepository ;
    private c:IConverter ;

    constructor() {
        this.userRepository = new UserRepository() ;
        this.expenseRepository = new ExpenseRepository() ;
        this.categoryRepository = new CategoryRepository() ;
        this.c = new Converter() ;
    }

    async addExpense(email: string, expense: ExpenseDTO): Promise<ExpenseDTO> {
        try {
            const expenseToAdd = this.c.expenseDtoToEntity(expense) ;
            const userToAdd = await this.userRepository.findUserByEmail(email) ;
            const categoryToAdd = await this.categoryRepository.findCategoryByName(expense.category.name) ; ;
            // let categoryToAdd:Category ;

            // if(findedCategory) {
            //     categoryToAdd = findedCategory ;
            // } else {
            //     categoryToAdd = await this.categoryRepository.addCategory(this.c.categoryDtoToEntity(expense.category)) ;
            // }

            if(userToAdd) {
                if((userToAdd.wallet - expenseToAdd.amount) > 0) {
                    userToAdd.wallet = userToAdd.wallet - expenseToAdd.amount ;
                    expenseToAdd.user = userToAdd ;

                    if(categoryToAdd){
                        expenseToAdd.category = categoryToAdd ;
                    } else {
                        throw new RepositoryError("There's an error adding your expense...") ;
                    }
                        
                    return this.c.expenseEntityToDto(await this.expenseRepository.addExpense(expenseToAdd)) ;
                } else {
                    throw new RepositoryError("You can't add an expense if your wallet is going to be lower than 0") ;
                }
            } else {
                throw new RepositoryError("There's an error adding your expense...") ;
            }
        } catch (error) {
            if(error instanceof RepositoryError) {
                throw new ServiceError(error.message) ;
            }
            throw new ServiceError("There's a problem with the connection...") ;
        }
    }

    async findExpenses(email:string, start: Date, end: Date): Promise<ExpenseDTO[] | null> {
        try {
            const findedUser = await this.userRepository.findUserByEmail(email) ;
            
            if(findedUser) {
                return this.c.listExpenseEntityToDto(await this.expenseRepository.findExpenses(findedUser, start, end) || []) ;
            } else {
                throw new RepositoryError("There's an error getting your expenses...") ;
            }
        } catch (error) {
            if(error instanceof RepositoryError) {
                throw new ServiceError(error.message) ;
            }
            throw new ServiceError("There's a problem with the connection...") ;
        }
    }

}