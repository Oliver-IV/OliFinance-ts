import CategoryDTO from "./CategoryDTO";
import ExpenseDTO from "./ExpenseDTO";
import IncomeDTO from "./IncomeDTO";

export default class UserDTO {
    
    email : string ;

    password : string ;

    name : string ;

    last_name : string ;

    wallet ?: number ;

    categories ?: CategoryDTO[] ;

    constructor(email:string, password:string, name:string, last_name:string, wallet?:number, categories?:CategoryDTO[]) {
        this.email = email ;
        this.password = password ;
        this.name = name ;
        this.last_name = last_name ;
        this.wallet = wallet ;
        this.categories = categories ;
    }
}