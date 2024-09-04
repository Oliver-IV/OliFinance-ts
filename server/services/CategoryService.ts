import CategoryDTO from "../dtos/CategoryDTO";
import ICategoryService from "../interfaces/service/ICategoryService";

export default class CategoryService implements ICategoryService {

    addCategoryForUser(category: CategoryDTO): Promise<CategoryDTO> {
        throw new Error("Method not implemented.");
    }
    removeCategory(category: CategoryDTO): Promise<CategoryDTO> {
        throw new Error("Method not implemented.");
    }
    findCategoryByName(name: string): Promise<CategoryDTO> {
        throw new Error("Method not implemented.");
    }

}