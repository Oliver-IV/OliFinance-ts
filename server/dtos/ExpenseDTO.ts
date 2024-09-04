import CategoryDTO from "./CategoryDTO";

export default class ExpenseDTO {

    amount : number ;

    date : Date ;

    title : string ;

    note : string ;

    category : CategoryDTO ;

    constructor(amount:number, date:Date, title:string, note:string, category:CategoryDTO) {
        this.amount = amount ;
        this.date = date ;
        this.title = title ;
        this.note = note ;
        this.category = category ;
    }

}