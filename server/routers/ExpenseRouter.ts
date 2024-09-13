import { Router } from "express";
import { verifyWithTokenAccess } from "../utils/Authorization";
import { POSTaddExpense } from "../controllers/ExpenseController";

const expenseRouter = Router() ;

expenseRouter.use((req, res, next) => {
    if(verifyWithTokenAccess(req)) {
        next() ;
    } else {
        res.redirect("/loginfirst") ;
    }
}) ;

expenseRouter.post("/add", async (req, res) => {
    await POSTaddExpense(req, res) ;
}) ;

export default expenseRouter ;