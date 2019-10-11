import express from 'express';
import { SERVER_PORT } from '../global/environment';
import cors from 'cors';

import http from 'http';
import socket from 'socket.io';

import * as sockets from '../sockets/sockets';

export default class Server{
    private static _instance: Server;                                     //Singleton - Objeto de la misma clase

    public app: express.Application;
    public port : number;

    public io: socket.Server;
    private httpServer: http.Server;

    private constructor(){                                                  //Singleton
        this.app = express();
        this.middleware();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = socket(this.httpServer);
        this.escucharSocket();
    }

    public static get instance(){
        return this._instance || (this._instance = new this())
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


    private escucharSocket(){
        
        this.io.on('connection', cliente =>{                                //Dentro de 'connection' van a estar todas las eventos
            console.log('Cliente conectado');

            sockets.desconectar(cliente);
            sockets.message(cliente, this.io);
        })
    }

   start(callback: Function){
        this.httpServer.listen(this.port, callback());
   } 

}