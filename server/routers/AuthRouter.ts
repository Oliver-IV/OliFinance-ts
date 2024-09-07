import { Router } from "express";
import { POSTlogin } from "../controllers/AuthController";

const authRouter = Router() ;

authRouter.post("/login", (req, res) => {
    POSTlogin(req, res) ;
}) ;

export default authRouter ;