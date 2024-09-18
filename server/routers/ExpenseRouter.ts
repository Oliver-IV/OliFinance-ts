import { Router } from "express";
import { verifyWithTokenAccess } from "../utils/Authorization";
import { POSTaddExpense, GETgetExpenses, GETgetExpensesAmount } from "../controllers/ExpenseController";

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

expenseRouter.get("/", async(req, res) => {
    await GETgetExpenses(req, res) ;
}) ;

expenseRouter.get("/amount", async(req, res) => {
    await GETgetExpensesAmount(req, res) ;
}) ;

export default expenseRouter ;