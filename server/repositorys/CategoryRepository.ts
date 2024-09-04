import Category from "../entitys/Category";
import ICategortRepository from "../interfaces/ICategoryRepository";

export default class CategoryRepository implements ICategortRepository {
    
    addCategoryForUser(email: string, category: Category): Category {
        throw new Error("Method not implemented.");
    }
    removeCategory(category: Category): Category {
        throw new Error("Method not implemented.");
    }
    findCategory(category: Category): Category {
        throw new Error("Method not implemented.");
    }

}