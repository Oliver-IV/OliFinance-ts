import UserDTO from "../dtos/UserDTO";
import IUserService from "../interfaces/service/IUserService";

export default class UserService implements IUserService {
    
    addUser(user: UserDTO): Promise<UserDTO> {
        throw new Error("Method not implemented.");
    }
    findUserByEmail(email: string): Promise<UserDTO> {
        throw new Error("Method not implemented.");
    }

}