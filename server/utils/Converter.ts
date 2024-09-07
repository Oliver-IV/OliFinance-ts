import IConverter from "../interfaces/utils/IConverter" ;
import CategoryDTO from "../dtos/CategoryDTO";
import ExpenseDTO from "../dtos/ExpenseDTO";
import IncomeDTO from "../dtos/IncomeDTO";
import UserDTO from "../dtos/UserDTO";
import Category from "../entitys/Category";
import Expense from "../entitys/Expense";
import Income from "../entitys/Income";
import User from "../entitys/User";

export default class Converter implements IConverter {

    userDtoToEntity(dto:UserDTO) : User {
        return new User(
            dto.email,
            dto.password,
            dto.name,
            dto.last_name,
            dto.wallet,
            this.listCategoryDtoToEntity(dto.categories || [])
        ) ;
    }

    userEntityToDto(entity:User) : UserDTO {
        return new UserDTO(
            entity.email,
            entity.password,
            entity.name,
            entity.last_name,
            entity.wallet,
            this.listCategoryEntityToDto(entity.categories || [])
        )
    }
    
    expenseDtoToEntity(dto:ExpenseDTO) : Expense {
        return new Expense(
            dto.date,
            dto.amount,
            dto.title,
            dto.note,
            this.categoryDtoToEntity(dto.category) 
        ) ;
    }

    expenseEntityToDto(entity:Expense) : ExpenseDTO {
        return new ExpenseDTO(
            entity.amount,
            entity.date,
            entity.title,
            entity.note,
            this.categoryEntityToDto(entity.category)
        ) ;
    }

    incomeDtoToEntity(dto:IncomeDTO) : Income {
        return new Income(
            dto.date,
            dto.amount
        ) ;
    }

    incomeEntityToDto(entity:Income) : IncomeDTO {
        return new IncomeDTO(
            entity.amount,
            entity.date
        ) ;
    }

    categoryDtoToEntity(dto:CategoryDTO) : Category {
        return new Category(
            dto.name
        ) ;
    }

    categoryEntityToDto(entity:Category) : CategoryDTO {
        return new CategoryDTO(
            entity.name
        ) ;
    }

    listUserDtoToEntity(dtos:UserDTO[]) : User[] {
        const entitys:User[] = [] ;

        dtos.forEach(dto => {
            entitys.push(this.userDtoToEntity(dto)) ;
        }) ;

        return entitys ;
    }

    listUserEntityToDto(entitys:User[]) : UserDTO[] {
        const dtos:UserDTO[] = [] ;

        entitys.forEach(entity => {
            dtos.push(this.userEntityToDto(entity)) ;
        }) ;

        return dtos ;
    }
    
    listExpenseDtoToEntity(dtos:ExpenseDTO[]) : Expense[] {
        const entitys:Expense[] = [] ;

        dtos.forEach(dto => {
            entitys.push(this.expenseDtoToEntity(dto)) ;
        }) ;

        return entitys ;
    }

    listExpenseEntityToDto(entitys:Expense[]) : ExpenseDTO[] {
        const dtos:ExpenseDTO[] = [] ;

        entitys.forEach(entity => {
            dtos.push(this.expenseEntityToDto(entity)) ;
        })

        return dtos ;
    }

    listIncomeDtoToEntity(dtos:IncomeDTO[]) : Income[] {
        const entitys:Income[] = [] ;

        dtos.forEach(dto => {
            entitys.push(this.incomeDtoToEntity(dto)) ;
        }) ;

        return entitys ;
    }

    listIncomeEntityToDto(entitys:Income[]) : IncomeDTO[] {
        const dtos:IncomeDTO[] = [] ;

        entitys.forEach(entity => {
            dtos.push(this.incomeEntityToDto(entity)) ;
        }) ;

        return dtos ;
    }

    listCategoryDtoToEntity(dtos:CategoryDTO[]) : Category[] {
        const entitys:Category[] = [] ;

        dtos.forEach(dto => {
            entitys.push(this.categoryDtoToEntity(dto)) ;
        }) ;

        return entitys ;
    }

    listCategoryEntityToDto(entitys:Category[]) : CategoryDTO[] {
        const dtos:CategoryDTO[] = [] ;

        entitys.forEach(entity => {
            dtos.push(this.categoryEntityToDto(entity)) ;
        }) ;

        return dtos ;
    }


}