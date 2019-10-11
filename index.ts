import Server from "./clases/Server";
import { SERVER_PORT } from "./global/environment";
import router from './route/Router'

const server = Server.instance;                                             //Metodo estatico
server.app.use('/', router)

server.start(()=>{                                                          //Envio una callback al metodo start()
    console.log(`Runing server port ${SERVER_PORT}`)
})