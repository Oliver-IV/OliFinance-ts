import User from "../entitys/User";

export default interface IUserRepository {
    
    addUser(user:User):User ;

    findUserByEmail(email:string) ;

}