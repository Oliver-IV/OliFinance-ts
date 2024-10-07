import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import Category from "./entitys/Category";
import Expense from "./entitys/Expense";
import Income from "./entitys/Income";
import User from "./entitys/User";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from "./utils/Config"; 

export const connection = new DataSource({
    type: "mysql",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    entities: [Category, Expense, Income, User],
    synchronize: true,
    logging: false
}) ;
