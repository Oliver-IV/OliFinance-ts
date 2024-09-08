import { Router } from "express";
import { POSTlogin, POSTcreateAccount } from "../controllers/AuthController";
import { verifyWithTokenAccess } from "../utils/Authorization";

const authRouter = Router() ;

authRouter.use((req, res, next) => {
    if(!verifyWithTokenAccess(req)) {
        next() ;
    } else {
        res.redirect("/logoutfirst") ;
    }
}) ;

authRouter.post("/login", async (req, res) => {
    await POSTlogin(req, res) ;
}) ;

authRouter.post("/createAccount", async (req, res) => {
    await POSTcreateAccount(req, res) ;
}) ;

export default authRouter ;