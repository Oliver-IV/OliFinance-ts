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

//const publicPath = path.join(__dirname, "../public") ;
const app = express() ;

app.set("view engine", "ejs") ;
app.use(bodyParser.urlencoded({extended: true})) ;
app.use(express.static(publicPath)) ;
app.use(express.json()) ;
app.use(cookieParser()) ;
app.use((req, res, next) => {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    const token = req.cookies.access_token ;
    const changep_token = req.cookies.changep_token ;
    (req as any).session = {user: null, dataPassword: null} ;req
    try {
        const data = jwt.verify(token, process.env.SECRET_KEY) ;
        data.accounts = "" ;
        (req as any).session.user = data ;
    } catch (error) {

    }
    try {
        const dataPassword = jwt.verify(changep_token, process.env.CHANGEP_KEY) ;
        (req as any).session.dataPassword = dataPassword ;
    } catch (error) {
        
    }
    next() ;
}) ;

app.use("/auth", authRouter) ;
app.use("/category", categoryRouter) ;
app.use("/expense", expenseRouter) ;
app.use("/income", incomeRouter) ;
app.use("/menu", menuRouter) ;

app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "/pages/login.html")) ;
}) ;

app.get("/createAcc", (req, res) => {
    res.sendFile(path.join(publicPath, "/pages/crearCuenta.html")) ;
}) ;

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`) ;
}) ;

