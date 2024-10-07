import { Router } from "express";
import { verifyWithTokenAccess } from "../utils/Authorization";
import { GETgetIncomesAmount, POSTaddIncome, GETgetIncomes } from "../controllers/IncomeController";

const incomeRouter = Router() ;

incomeRouter.use((req, res, next) => {
    if(verifyWithTokenAccess(req)) {
        next() ;
    } else {
        res.redirect("/loginfirst") ;
    }
}) ;

incomeRouter.get("", async (req, res) => {
    await GETgetIncomes(req, res) ;
}) ;

incomeRouter.get("/amount", async (req, res) => {
    await GETgetIncomesAmount(req, res) ;
}) ;

incomeRouter.post("/add", async (req, res) => {
    await POSTaddIncome(req, res) ;
}) ;

export default incomeRouter ;