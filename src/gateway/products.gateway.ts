import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "http";

@WebSocketGateway({
    cors:{
        origin: '*',
    },
})
export class ProductsGateway{
    @WebSocketServer()
    server: Server;

    notifyClients(event: string, data: any){
        this.server.emit(event,data);
    }
}