import { Router } from "express";
import { POSTlogin } from "../controllers/AuthController";
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

export default authRouter ;