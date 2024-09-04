import User from "../../entitys/User";

export default interface IUserRepository {
    
    addUser(user:User):Promise<User> ;

    findUserByEmail(email:string):Promise<User | null> ;

}