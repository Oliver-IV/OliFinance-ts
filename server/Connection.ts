import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import Category from "./entitys/Category";
import Expense from "./entitys/Expense";
import Income from "./entitys/Income";
import User from "./entitys/User";

console.log(process.env.DB_HOST) ;
export const connection = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Category, Expense, Income, User],
    synchronize: true,
    logging: false
}) ;