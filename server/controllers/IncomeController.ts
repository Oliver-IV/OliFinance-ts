import { Request, Response } from "express";
import { ServiceError } from "../errors/ServiceError";
import { getTokenData } from "../utils/Authorization";
import ExpenseDTO from "../dtos/ExpenseDTO";
import CategoryDTO from "../dtos/CategoryDTO";
import IIncomeService from "../interfaces/service/IIncomeService";
import IncomeService from "../services/IncomeService";
import IncomeDTO from "../dtos/IncomeDTO";

const service:IIncomeService = new IncomeService() ;

async function GETgetIncomesAmount(req:Request, res:Response) {
    try {
        const datesRange = req.query ;
        const start = new Date(String(datesRange.start)) ;
        const end = new Date(String(datesRange.end)) ;
        const tokenData = getTokenData(req) ;
        const incomes = await service.findIncomes((tokenData as any).email, start, end) ;
        let incomesAmount = 0 ;
        
        incomes?.forEach(income => {
            incomesAmount += income.amount ;
        })

        res.status(200).json({amount: incomesAmount}) ;
    } catch (error) {
        if(error instanceof ServiceError) {
            res.status(400).send(error.message) ;
        } else {
            res.status(400).send("There's an error with the connection") ;
        }
    }
}

async function POSTaddIncome(req:Request, res:Response) {
    try {
        const { amount, date } = req.body ;
        const tokenData = getTokenData(req) ;
        const addedIncome = await service.addIncome((tokenData as any).email, new IncomeDTO(amount, date)) ;
        
        if(addedIncome) {
            res.status(200).send("Income added successfully") 
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

export { GETgetIncomesAmount, POSTaddIncome } ;