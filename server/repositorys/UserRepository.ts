import User from "../entitys/User";
import IUserRepository from "../interfaces/IUserRepository";

export default class UserRepository implements IUserRepository {
    
    addUser(user: User): User {
        throw new Error("Method not implemented.");
    }
    findUserByEmail(email: string): User {
        throw new Error("Method not implemented.");
    }

}