import "reflect-metadata";
import User from "./entitys/User";
import UserRepository from "./repositorys/UserRepository";
import { connection } from "./Connection";

async function init() {
    await connection.initialize() ;
    const repo = new UserRepository() ;

    console.log(await repo.addUser(new User("olipotro@gmail.com", "contrasenia", "oliver", "valle"))) ;
}

init() ;