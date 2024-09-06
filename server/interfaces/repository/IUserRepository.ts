import User from "../../entitys/User";

export default interface IUserRepository {
    
    addUser(user:User):Promise<User> ;

    updateUser(user:User):Promise<void> ;

    findUserByEmail(email:string):Promise<User | null> ;

}