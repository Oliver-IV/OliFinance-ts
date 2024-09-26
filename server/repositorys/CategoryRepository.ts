import { connection } from "../connection";
import Category from "../entitys/Category";
import { RepositoryError } from "../errors/RepositoryError";
import ICategortRepository from "../interfaces/repository/ICategoryRepository";

export default class CategoryRepository implements ICategortRepository {

    constructor() {
        this.initializeConnection() ;
    }

    private async initializeConnection() {
        if(!connection.isInitialized) {
            await connection.initialize();
        }
    }

    async addCategory(category: Category): Promise<Category> {
        try {
            const repoCategories =  connection.getRepository(Category) ;

            return await repoCategories.save(category) ;
        } catch (error) {
            throw new RepositoryError("There's an error with the connection...") ;
        }
    }

    async removeCategory(category: Category): Promise<Category> {
        try {
            const repoCategories =  connection.getRepository(Category) ;

            return await repoCategories.remove(category) ;
        } catch (error) {
            throw new RepositoryError("There's an error with the connection...") ;
        }
    }
    
    async findCategoryByName(name: string): Promise<Category | null> {
        try {
            const repoCategories =  connection.getRepository(Category) ;
            const findedCategory = await repoCategories.findOneBy({
                name: name
            }) ;

            return findedCategory ;
        } catch (error) {
            throw new RepositoryError("There's an error with the connection...") ;
        }
    }

}