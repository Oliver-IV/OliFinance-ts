import Category from "../../entitys/Category";


export default interface ICategortRepository {

    addCategory(category:Category):Promise<Category> ;

    removeCategory(category:Category):Promise<Category> ;

    findCategoryByName(name:string):Promise<Category | null> ;

}