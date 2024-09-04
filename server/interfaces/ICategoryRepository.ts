import Category from "../entitys/Category";


export default interface ICategortRepository {

    addCategoryForUser(email:string, category:Category):Category ;

    removeCategory(category:Category):Category ;

    findCategory(category:Category):Category ;

}