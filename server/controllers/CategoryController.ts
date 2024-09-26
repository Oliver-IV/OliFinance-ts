import { Request, Response } from "express";
import { ServiceError } from "../errors/ServiceError";
import ICategoryService from "../interfaces/service/ICategoryService";
import CategoryService from "../services/CategoryService";
import { getTokenData } from "../utils/Authorization";
import CategoryDTO from "../dtos/CategoryDTO";

const service: ICategoryService = new CategoryService();

async function POSTaddCategory(req: Request, res: Response) {

    try {
        
        const { name } = req.body ;
        const tokenData = getTokenData(req);
        const addedCategory = await service.addCategoryForUser((tokenData as any).email,new CategoryDTO(name));

        if(addedCategory){

            res.status(200).send('Category added successfully');

        }else{
            throw new Error();
        }

    } catch (error) {
        if(error instanceof ServiceError) {

            res.status(400).send(error.message) ;

        } else {

            res.status(400).send("There's an error with the connection") ;

        }

    }

}

async function GETgetUserCategories(req:Request, res:Response) {

    try {
        const tokenData = getTokenData(req) ;
        const categories = await service.findUserCategories((tokenData as any).email) ;

        if(categories) {
            res.status(200).send(categories) ;
        } else {
            throw new Error() ;
        }

    } catch (error) {
        if(error instanceof ServiceError) {
            res.status(400).send(error.message) ;
        } else {
            res.status(400).send("There's an error with the connection") ;
        }
    }

}

export { POSTaddCategory, GETgetUserCategories };