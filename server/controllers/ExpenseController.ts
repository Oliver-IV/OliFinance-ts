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
        const addedExpense = await service.addExpense((tokenData as any).email, new ExpenseDTO(amount, new Date(date), title, note, new CategoryDTO(category))) ;
        
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

async function GETgetExpenses(req:Request, res:Response) {
    try {
        const datesRange = req.query ;
        const start = new Date(String(datesRange.start)) ;
        const end = new Date(String(datesRange.end)) ;
        const tokenData = getTokenData(req) ;
        const expenses = await service.findExpenses((tokenData as any).email, start, end) ;
        res.status(200).send(expenses) ;
    } catch (error) {
        if(error instanceof ServiceError) {
            res.status(400).send(error.message) ;
        } else {
            res.status(400).send("There's an error with the connection") ;
        }
    }
}

async function GETgetExpensesAmount(req:Request, res:Response) {
    try {
        const datesRange = req.query ;
        const start = new Date(String(datesRange.start)) ;
        const end = new Date(String(datesRange.end)) ;
        const tokenData = getTokenData(req) ;
        const expenses = await service.findExpenses((tokenData as any).email, start, end) ;
        let expensesAmount = 0 ;
        
        expenses?.forEach(expense => {
            expensesAmount += expense.amount ;
        })

        res.status(200).json({amount: expensesAmount}) ;
    } catch (error) {
        console.log(error) ;
        if(error instanceof ServiceError) {
            res.status(400).send(error.message) ;
        } else {
            res.status(400).send("There's an error with the connection") ;
        }
    }
}

export { POSTaddExpense, GETgetExpenses, GETgetExpensesAmount } ;