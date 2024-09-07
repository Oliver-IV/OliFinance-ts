import CategoryDTO from "../../dtos/CategoryDTO";
import ExpenseDTO from "../../dtos/ExpenseDTO";
import IncomeDTO from "../../dtos/IncomeDTO";
import UserDTO from "../../dtos/UserDTO";
import Category from "../../entitys/Category";
import Expense from "../../entitys/Expense";
import Income from "../../entitys/Income";
import User from "../../entitys/User";

export default interface IConverter {
    userDtoToEntity(dto: UserDTO): User;

    userEntityToDto(entity: User): UserDTO;

    expenseDtoToEntity(dto: ExpenseDTO): Expense;

    expenseEntityToDto(entity: Expense): ExpenseDTO;

    incomeDtoToEntity(dto: IncomeDTO): Income;

    incomeEntityToDto(entity: Income): IncomeDTO;

    categoryDtoToEntity(dto: CategoryDTO): Category;

    categoryEntityToDto(entity: Category): CategoryDTO;

    listUserDtoToEntity(dtos: UserDTO[]): User[];

    listUserEntityToDto(entitys: User[]): UserDTO[];

    listExpenseDtoToEntity(dtos: ExpenseDTO[]): Expense[];

    listExpenseEntityToDto(entitys: Expense[]): ExpenseDTO[];

    listIncomeDtoToEntity(dtos: IncomeDTO[]): Income[];

    listIncomeEntityToDto(entitys: Income[]): IncomeDTO[];

    listCategoryDtoToEntity(dtos: CategoryDTO[]): Category[];

    listCategoryEntityToDto(entitys: Category[]): CategoryDTO[];
}
