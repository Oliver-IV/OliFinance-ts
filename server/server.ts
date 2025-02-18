import express from "express" ;
import bodyParser from "body-parser";
import path from "path" ;
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken" ;
import "dotenv/config";
import authRouter from "./routers/AuthRouter";
import categoryRouter from "./routers/CategoryRouter";
import expenseRouter from "./routers/ExpenseRouter";
import incomeRouter from "./routers/IncomeRouter";
import menuRouter from "./routers/MenuRouter";
import userRouter from "./routers/UserRouter";
import { PORT, publicPath } from "./utils/Config";
import { verifyToken, verifyWithTokenAccess } from "./utils/Authorization";
import { connection } from "./connection";
import cors from "cors" ;

connection.initialize() ;

const app = express() ;

app.set("view engine", "ejs") ;
app.use(cors()) ;
app.use(bodyParser.urlencoded({extended: true})) ;
app.use(express.static(publicPath)) ;
app.use(express.json()) ;
app.use(cookieParser()) ;
app.use((req, res, next) => {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next() ;
}) ;

app.use("/auth", authRouter) ;
app.use("/category", categoryRouter) ;
app.use("/expense", expenseRouter) ;
app.use("/income", incomeRouter) ;
app.use("/menu", menuRouter) ;
app.use("/user", userRouter) ;

app.get("/", (req, res) => {
    if(!verifyWithTokenAccess(req)) {
        res.sendFile(path.join(publicPath, "/pages/login.html")) ;
    } else {
        res.redirect("/logoutfirst") ;
    }
}) ;

app.get("/createAcc", (req, res) => {
    if(!verifyWithTokenAccess(req)) {
        res.sendFile(path.join(publicPath, "/pages/crearCuenta.html")) ;
    } else {
        res.redirect("/logoutfirst") ;
    }
}) ;

app.get("/loginfirst", (req, res) => {
    res.sendFile(path.join(publicPath, "/pages/loginRequired.html")) ;
}) ;

app.get("/logoutfirst", (req, res) => {
    res.sendFile(path.join(publicPath, "/pages/logoutRequired.html")) ;
}) ;

app.post("/logout", (req, res) => {
    res.clearCookie("access_token") ;
    res.status(200).send() ;
}) ;

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`) ;
}) ;

