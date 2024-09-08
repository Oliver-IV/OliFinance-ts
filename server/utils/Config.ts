import path from "path" ;

export const publicPath : string = path.join(__dirname, "../../public") ;
export const PORT : number = Number(process.env.PORT) || 3000 ;
export const DB_HOST = process.env.DB_HOST ;
export const DB_PORT = Number(process.env.DB_PORT) ;
export const DB_USERNAME = process.env.DB_USERNAME ;
export const DB_PASSWORD = process.env.DB_PASSWORD ;
export const DB_DATABASE = process.env.DB_DATABASE ;
export const SECRET_KEY = String(process.env.SECRET_KEY) ;
export const CHANGEP_KEY = String(process.env.CHANGEP_KEY) ;