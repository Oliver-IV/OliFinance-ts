import { Request, Response } from "express";
import { ServiceError } from "../errors/ServiceError";
import UserService from "../services/UserService";
import jwt from "jsonwebtoken" ;
import UserDTO from "../dtos/UserDTO";
import { SECRET_KEY, CHANGEP_KEY } from "../utils/Config";
import IUserService from "../interfaces/service/IUserService";

const service:IUserService = new UserService() ;

async function POSTlogin(req:Request, res:Response) {
    try {
        const { email, password } = req.body ;
        const loginUser =  await service.login(email, password) ;

        if(loginUser) {
            const cookie = jwt.
            sign({
                email: loginUser.email
                },
                SECRET_KEY,
                {
                    expiresIn: "1h"
                }
            ) ;

            res.status(200).cookie("access_token", cookie, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 3600000
            }).send("Logged succesully") ;
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

async function POSTcreateAccount(req:Request, res:Response) {
    try {
        const { email, password, repeatedPassword, name, last_name } = req.body ;

        if(password == repeatedPassword) {
            const user = await service.addUser(new UserDTO(email, password, name, last_name)) ;

            if(user) {
                res.status(200).send("User added successfully") ;
            } else {
                throw new Error() ;
            }
        } else {
            res.status(400).send("Passwords don't match") ;
        }
    } catch (error) {
        if(error instanceof ServiceError) {
            res.status(400).send(error.message) ;
        } else {
            res.status(400).send("There's an error with the connection") ;
        }
    }
}

export { POSTlogin, POSTcreateAccount } ;