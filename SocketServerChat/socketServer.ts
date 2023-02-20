import { Socket } from "socket.io";

const handleSocketEvents = (socket: Socket) => {
socket.on("message", (data: any) => {
console.log("The WebSocket Server Received: ",data);
});
};

export default handleSocketEvents;
