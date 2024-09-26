import { Router } from "express";
import { verifyWithTokenAccess } from "../utils/Authorization";
import { GETgetIncomesAmount, POSTaddIncome } from "../controllers/IncomeController";

const incomeRouter = Router() ;

incomeRouter.use((req, res, next) => {
    if(verifyWithTokenAccess(req)) {
        next() ;
    } else {
        res.redirect("/loginfirst") ;
    }
}) ;

incomeRouter.get("/amount", async (req, res) => {
    await GETgetIncomesAmount(req, res) ;
}) ;

incomeRouter.post("/add", async (req, res) => {
    await POSTaddIncome(req, res) ;
}) ;

export default incomeRouter ;