import CategoryDTO from "../../dtos/CategoryDTO";

export default interface ICategoryService {

    addCategoryForUser(email:string, category:CategoryDTO):Promise<CategoryDTO> ;

    removeCategory(email:string, category:CategoryDTO):Promise<CategoryDTO> ;

    findCategoryByName(name:string):Promise<CategoryDTO | null> ;

    findUserCategories(email:string):Promise<CategoryDTO[] | null> ;

}