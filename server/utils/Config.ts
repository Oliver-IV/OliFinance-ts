import path from "path" ;

export const publicPath : string = path.join(__dirname, "../../public") ;
export const PORT : number = Number(process.env.PORT) || 3000 ;