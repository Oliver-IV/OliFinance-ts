import { Router } from "express";
import { GETgetUserCategories, POSTaddCategory } from "../controllers/CategoryController";
const categoryRouter = Router() ;

categoryRouter.post('/add', (req, res) => {

    POSTaddCategory(req, res);

}) ;

categoryRouter.get("", (req, res) => {
    GETgetUserCategories(req, res) ;
}) ;

export default categoryRouter ;