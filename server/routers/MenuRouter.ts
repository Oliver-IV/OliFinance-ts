import { Router } from "express";
import path from "path" ;
import { publicPath } from "../utils/Config";

const menuRouter = Router() ;

menuRouter.get("", (req, res) => {
    res.sendFile(path.join(publicPath, "pages/menu.html")) ;
}) ;

export default menuRouter ;