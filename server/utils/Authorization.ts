import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken" ;
import { SECRET_KEY, CHANGEP_KEY } from "./Config";

function verifyToken(req:Request, res:Response, next:NextFunction) {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    const token = req.cookies.access_token ;
    const changep_token = req.cookies.changep_token ;
    (req as any).session = {user: null, dataPassword: null} ;req
    try {
        const data = jwt.verify(token, SECRET_KEY) ;
        (req as any).session.user = data ;
    } catch (error) {

    }
    try {
        const dataPassword = jwt.verify(changep_token, CHANGEP_KEY) ;
        (req as any).session.dataPassword = dataPassword ;
    } catch (error) {
        
    }
    next() ;
}

function verifyWithTokenAccess(req:Request):boolean {
    return ((req as any).session.user)
}

function verifyWithNoTokenAccess(req:Request, res:Response) {

}

export { verifyToken, verifyWithNoTokenAccess, verifyWithTokenAccess } ;