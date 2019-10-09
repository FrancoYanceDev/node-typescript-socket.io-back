import express from 'express';
import { SERVER_PORT } from '../global/environment';
import cors from 'cors';
export default class Server{
    public app: express.Application;
    public port : number;

    constructor(){
        this.app = express();
        this.middleware();

        this.port = SERVER_PORT;
    }
    middleware(){
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(express.json())
        this.app.use(cors({origin: true, credentials: true}))               //Cualquier persona puede llamar a mi servicio

        this.app.use((req: express.Request, resp: express.Response, next: express.NextFunction)=>{
            next()
            resp.send('El endpoint no existe')
        })
    }

   start(callback: Function){
        this.app.listen(this.port, callback());
   } 

}