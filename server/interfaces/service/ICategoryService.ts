import CategoryDTO from "../../dtos/CategoryDTO";

export default interface ICategoryService {

    addCategoryForUser(category:CategoryDTO):Promise<CategoryDTO> ;

    removeCategory(category:CategoryDTO):Promise<CategoryDTO> ;

    findCategoryByName(name:string):Promise<CategoryDTO> ;

}