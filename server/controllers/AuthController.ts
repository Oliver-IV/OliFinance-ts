import { Request, Response } from "express";
import { ServiceError } from "../errors/ServiceError";
import UserService from "../services/UserService";
import jwt from "jsonwebtoken" ;

const service = new UserService() ;

async function POSTlogin(req:Request, res:Response) {
    try {
        const { email, password } = req.body ;
        const loginUser =  await service.login(email, password) ;

        if(loginUser) {
            const cookie = jwt.
            sign({
                email: loginUser.email
                },
                String(process.env.SECRET_KEY),
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
        }
    } catch (error) {
        if(error instanceof ServiceError) {
            res.status(400).send(error.message) ;
        } else {
            res.status(400).send("There's an error with the connection") ;
        }
    }
}

export { POSTlogin } ;