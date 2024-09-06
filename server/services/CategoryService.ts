import CategoryDTO from "../dtos/CategoryDTO";
import ICategoryService from "../interfaces/service/ICategoryService";

export default class CategoryService implements ICategoryService {

    addCategoryForUser(email: string, category: CategoryDTO): Promise<CategoryDTO> {
        throw new Error("Method not implemented.");
    }
    removeCategory(email: string, category: CategoryDTO): Promise<CategoryDTO> {
        throw new Error("Method not implemented.");
    }
    findCategoryByName(name: string): Promise<CategoryDTO | null> {
        throw new Error("Method not implemented.");
    }

}