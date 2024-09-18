import UserDTO from "../../dtos/UserDTO";

export default interface IUserService {

    addUser(user:UserDTO):Promise<UserDTO> ;

    findUserByEmail(email:string):Promise<UserDTO> ;

    getUserWallet(email:string):Promise<number> ;

    login(email:string, password:string):Promise<UserDTO> ;

}