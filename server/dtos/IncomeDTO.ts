export default class IncomeDTO {

    amount : number ;

    date : Date ;

    title: string ;

    constructor(amount:number, date:Date, title:string) {
        this.amount = amount ;
        this.date = date ;
        this.title = title ;
    }
    
}