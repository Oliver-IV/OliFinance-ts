import UserDTO from "../dtos/UserDTO";
import User from "../entitys/User";
import { RepositoryError } from "../errors/RepositoryError";
import { ServiceError } from "../errors/ServiceError";
import IUserRepository from "../interfaces/repository/IUserRepository";
import IUserService from "../interfaces/service/IUserService";
import IConverter from "../interfaces/utils/IConverter";
import UserRepository from "../repositorys/UserRepository";
import Converter from "../utils/Converter";
import { encrypytAES, decryptAES } from "../utils/Encryption";

export default class UserService implements IUserService {
    
    private userRepository:IUserRepository ;
    private c:IConverter ;

    constructor() {
        this.userRepository = new UserRepository() ;
        this.c = new Converter() ;
    }

    async addUser(user: UserDTO): Promise<UserDTO> {
        try {
            const userToAdd = this.c.userDtoToEntity(user) ;
            userToAdd.password = encrypytAES(userToAdd.password) ;
            
            return await this.userRepository.addUser(userToAdd) ; ;
        } catch (error) {
            if(error instanceof RepositoryError) {
                throw new ServiceError(error.message) ;
            } else {
                throw new ServiceError("There's an error with the connection...") ;
            }
        }
    }

    async findUserByEmail(email: string): Promise<UserDTO> {
        try {
            const findedUser = await this.userRepository.findUserByEmail(email) ;

            if(findedUser) {
                return this.c.userEntityToDto(findedUser) ;
            } else {
                throw new RepositoryError("There's not a user with this email") ;
            }
        } catch (error) {
            if(error instanceof RepositoryError) {
                throw new ServiceError(error.message) ;
            }
            throw new ServiceError("There's an error with the connection...") ;
        }
    }

    async getUserWallet(email: string): Promise<number> {
        try {
            const findedUser = await this.userRepository.findUserByEmail(email) ;

            if(findedUser) {
                return findedUser.wallet ;
            } else {
                throw new Error() ;
            }
        } catch (error) {
            if(error instanceof RepositoryError) {
                throw new ServiceError(error.message) ;
            }
            throw new ServiceError("There's an error with the connection...") ;
        }
    }

    async login(email: string, password: string): Promise<UserDTO> {
        try {
            const findedUser = await this.userRepository.findUserByEmail(email) ;

            if(findedUser) {
                if(password == decryptAES(findedUser.password)) {
                    return this.c.userEntityToDto(findedUser) ;
                }
            }
            throw new RepositoryError("Email or password are wrong") ;
        } catch (error) {
            if(error instanceof RepositoryError) {
                throw new ServiceError(error.message) ;
            } else {
                throw new ServiceError("There's an error with the connection...") ;
            }
        }
    }

}