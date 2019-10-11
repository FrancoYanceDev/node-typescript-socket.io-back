import { Socket } from "socket.io";
import socket from 'socket.io';

export const desconectar = (cliente:Socket)=>{
    cliente.on('disconnect', ()=>{
        console.log("Cliente desconectado")
    })
}

export const message = (cliente:Socket, io: socket.Server) =>{
    cliente.on('mensaje', (payload:{de: string, cuerpo: string})=>{
        console.log(payload)

        //Emitir el mensaje a todos los cliente conectados      io  = es el servidor

        io.emit('nuevo-message', payload)
         
    })
}