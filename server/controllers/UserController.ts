import { Request, Response } from "express";
import { ServiceError } from "../errors/ServiceError";
import UserService from "../services/UserService";
import jwt from "jsonwebtoken" ;
import UserDTO from "../dtos/UserDTO";
import { SECRET_KEY, CHANGEP_KEY } from "../utils/Config";
import IUserService from "../interfaces/service/IUserService";
import { getTokenData } from "../utils/Authorization";

const service:IUserService = new UserService() ;

async function GETgetUserWallet(req:Request, res:Response) {
    try {
        const tokenData = getTokenData(req) ;
        const wallet = await service.getUserWallet((tokenData as any).email) ;
        res.status(200).json({amount: wallet}) ;
    } catch (error) {
        if(error instanceof ServiceError) {
            res.status(400).send(error.message) ;
        } else {
            res.status(400).send("There's an error with the connection") ;
        }
    }
}

export { GETgetUserWallet } ;