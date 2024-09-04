import { connection } from "../Connection";
import User from "../entitys/User";
import { RepositoryError } from "../errors/RepositoryError";
import IUserRepository from "../interfaces/repository/IUserRepository";

export default class UserRepository implements IUserRepository {

    constructor() {
        this.initializeConnection() ;
    }

    private async initializeConnection() {
        if(!connection.isInitialized) {
            await connection.initialize();
        }
    }

    async addUser(user: User): Promise<User> {
        try {
            const repoUsers = connection.getRepository(User) ;

           const findedUser = await this.findUserByEmail(user.email) ;
            
           if(!findedUser) {
                return await repoUsers.save(user) ;
           }

           throw new RepositoryError("There's already a user with this email") ;
        } catch (error) {
            if (error instanceof RepositoryError) {
                throw new RepositoryError(error.message) ;
            }
            throw new RepositoryError("There's an error with the connecion...") ;
        }
    }

    async findUserByEmail(email: string): Promise<User | null> {
        try {
            const repoUsers = connection.getRepository(User) ;

            const user = await repoUsers.findOneBy({
                email: email
            }) ;

            return user ;
        } catch (error) {
            throw new RepositoryError("There's an error with the connection...") ;
        }
    }

}