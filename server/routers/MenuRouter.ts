import { Router } from "express";
import path from "path" ;
import { publicPath } from "../utils/Config";
import { verifyWithTokenAccess } from "../utils/Authorization";

const menuRouter = Router() ;

menuRouter.use((req, res, next) => {
    if(verifyWithTokenAccess(req)) {
        next() ;
    } else {
        res.redirect("/loginfirst") ;
    }
}) ;

menuRouter.get("", (req, res) => {
    res.sendFile(path.join(publicPath, "pages/menu.html")) ;
}) ;

menuRouter.get("/expenses", (req, res) => {
    res.sendFile(path.join(publicPath, "pages/gastos.html")) ;
}) ;

menuRouter.get("/incomes", (req, res) => {
    res.sendFile(path.join(publicPath, "/pages/ingresos.html"))
}) ;

menuRouter.get("/about", (req, res) => {
    res.sendFile(path.join(publicPath, "/pages/acercaDe.html")) ;
}) ;

export default menuRouter ;