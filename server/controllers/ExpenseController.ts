import { Request, Response } from "express";
import { ServiceError } from "../errors/ServiceError";
import ExpenseService from "../services/ExpenseService";
import IExpenseService from "../interfaces/service/IExpenseService";
import { getTokenData } from "../utils/Authorization";
import ExpenseDTO from "../dtos/ExpenseDTO";
import CategoryDTO from "../dtos/CategoryDTO";

const service:IExpenseService = new ExpenseService() ;

async function POSTaddExpense(req:Request, res:Response) {
    try {
        const { amount, date, title, note, category } = req.body ;
        const tokenData = getTokenData(req) ;
        const addedExpense = await service.addExpense((tokenData as any).email, new ExpenseDTO(amount, date, title, note, new CategoryDTO(category))) ;
        
        if(addedExpense) {
            res.status(200).send("Expense added successfully") 
        } else {
            throw new Error() ;
        }
    } catch (error) {
        if(error instanceof ServiceError) {
            res.status(400).send(error.message) ;
        } else {
            res.status(400).send("There's an error with the connection") ;
        }
    }
}

export { POSTaddExpense } ;