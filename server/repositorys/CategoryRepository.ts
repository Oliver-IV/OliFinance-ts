import { connection } from "../Connection";
import Category from "../entitys/Category";
import { ServiceError } from "../errors/ServiceError";
import ICategortRepository from "../interfaces/ICategoryRepository";

export default class CategoryRepository implements ICategortRepository {

    constructor() {
        this.initializeConnection() ;
    }

    private async initializeConnection() {
        if(!connection.isInitialized) {
            await connection.initialize();
        }
    }

    async addCategoryForUser(category: Category): Promise<Category> {
        try {
            const repoCategories =  connection.getRepository(Category) ;

            return await repoCategories.save(category) ;
        } catch (error) {
            throw new ServiceError("There's an error with the connection...") ;
        }
    }

    async removeCategory(category: Category): Promise<Category> {
        try {
            const repoCategories =  connection.getRepository(Category) ;

            return await repoCategories.remove(category) ;
        } catch (error) {
            throw new ServiceError("There's an error with the connection...") ;
        }
    }
    
    async findCategoryByName(name: string): Promise<Category> {
        try {
            const repoCategories =  connection.getRepository(Category) ;

            const findedCategory = await repoCategories.findOneBy({
                name: name
            }) ;

            if(findedCategory) {
                return findedCategory ;
            }
            throw new ServiceError("There's not a category with this name") ;
        } catch (error) {
            if(error instanceof ServiceError) {
                throw error ;
            }
            throw new ServiceError("There's an error with the connection...") ;
        }
    }

}