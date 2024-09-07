import CategoryDTO from "../dtos/CategoryDTO";
import Category from "../entitys/Category";
import { RepositoryError } from "../errors/RepositoryError";
import { ServiceError } from "../errors/ServiceError";
import ICategortRepository from "../interfaces/repository/ICategoryRepository";
import IUserRepository from "../interfaces/repository/IUserRepository";
import ICategoryService from "../interfaces/service/ICategoryService";
import IConverter from "../interfaces/utils/IConverter";
import CategoryRepository from "../repositorys/CategoryRepository";
import UserRepository from "../repositorys/UserRepository";
import Converter from "../utils/Converter";

export default class CategoryService implements ICategoryService {

    private userRepository:IUserRepository ;
    private categoryRepository:ICategortRepository ;
    private c:IConverter ;

    constructor() {
        this.userRepository = new UserRepository() ;
        this.categoryRepository = new CategoryRepository() ;
        this.c = new Converter() ;
    }

    async addCategoryForUser(email: string, category: CategoryDTO): Promise<CategoryDTO> {
        try {
            const findedCategory = await this.categoryRepository.findCategoryByName(category.name) ;
            let categoryToAdd:Category ;

            if(findedCategory) {
                categoryToAdd = findedCategory ;
            } else {
                categoryToAdd = this.c.categoryDtoToEntity(category) ;
            }

            const userToAdd = await this.userRepository.findUserByEmail(email) ;

            if(userToAdd) {
                const categoryAdded = await this.categoryRepository.addCategory(categoryToAdd) ;
                userToAdd.categories?.push(categoryAdded) ;
                await this.userRepository.updateUser(userToAdd) ;
                return this.c.categoryEntityToDto(categoryAdded) ;
            } else {
                throw new RepositoryError("There's an error adding your Category...") ;
            }
        } catch (error) {
            if(error instanceof RepositoryError) {
                throw new ServiceError(error.message) ;
            }
            throw new ServiceError("There's a problem with the connection...") ;
        }
    }

    async removeCategory(email: string, category: CategoryDTO): Promise<CategoryDTO> {
        try {
            const user = await this.userRepository.findUserByEmail(email) ;
            const categoryToRemove = category.name ;

            if(user?.categories && user && categoryToRemove) {
                const newCategories = user?.categories?.filter(category => category.name.toLowerCase() != categoryToRemove.toLowerCase()) ;
                user.categories = newCategories ;

                await this.userRepository.updateUser(user) ;

                return new CategoryDTO(categoryToRemove) ;
            } else {
                throw new RepositoryError("There's an error removing your Category...") ;
            }
            
        } catch (error) {
            if(error instanceof RepositoryError) {
                throw new ServiceError(error.message) ;
            }
            throw new ServiceError("There's a problem with the connection...") ;
        }
    }

    async findCategoryByName(name: string): Promise<CategoryDTO | null> {
        try {
            const findedCategory = await this.categoryRepository.findCategoryByName(name) ;
            if(findedCategory) {
                return this.c.categoryEntityToDto(findedCategory) ;
            } else {
                return null ;
            }
        } catch (error) {
            if(error instanceof RepositoryError) {
                throw new ServiceError(error.message) ;
            }
            throw new ServiceError("There's a problem with the connection...") ;
        }
    }

    async findUserCategories(email: string): Promise<CategoryDTO[] | null> {
        try {
            const user = await this.userRepository.findUserByEmail(email) ;

            if(user?.categories){
                return user?.categories ;
            } else {
                return null ;
            }
        } catch (error) {
            if(error instanceof RepositoryError) {
                throw new ServiceError(error.message) ;
            }
            throw new ServiceError("There's a problem with the connection...") ;
        }
    }

}