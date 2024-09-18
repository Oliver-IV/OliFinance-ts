import { Router } from "express";
import { verifyWithTokenAccess } from "../utils/Authorization";
import { GETgetUserWallet } from "../controllers/UserController";

const userRouter = Router() ;

userRouter.use((req, res, next) => {
    if(verifyWithTokenAccess(req)) {
        next() ;
    } else {
        res.redirect("/loginfirst") ;
    }
}) ;

userRouter.use("/wallet", async (req, res) => {
    try {
        await GETgetUserWallet(req, res) ;
    } catch (error) {
        
    }
}) ;

export default userRouter ;