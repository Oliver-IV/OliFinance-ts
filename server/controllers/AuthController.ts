import { Request, Response } from "express";
import { ServiceError } from "../errors/ServiceError";
import UserService from "../services/UserService";

const service = new UserService() ;

async function POSTlogin(req:Request, res:Response) {
    try {
        const { email, password } = req.body ;
        const login =  await service.login(email, password) ;
        
    } catch (error) {
        if(error instanceof ServiceError) {
            res.status(400).send(error.message) ;
        } else {
            res.status(400).send("There's an error with the connection") ;
        }
    }
}

export { POSTlogin } ;