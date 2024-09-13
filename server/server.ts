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
import { PORT, publicPath } from "./utils/Config";
import { verifyToken, verifyWithTokenAccess } from "./utils/Authorization";

const app = express() ;

app.set("view engine", "ejs") ;
app.use(bodyParser.urlencoded({extended: true})) ;
app.use(express.static(publicPath)) ;
app.use(express.json()) ;
app.use(cookieParser()) ;
app.use((req, res, next) => {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next() ;
}) ;
// app.use((req, res, next) => {
//     verifyToken(req, res, next) ;
// }) ;

app.use("/auth", authRouter) ;
app.use("/category", categoryRouter) ;
app.use("/expense", expenseRouter) ;
app.use("/income", incomeRouter) ;
app.use("/menu", menuRouter) ;

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
    res.send("Log in first") ;
}) ;

app.get("/logoutfirst", (req, res) => {
    res.send("Log out first") ;
}) ;

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`) ;
}) ;

