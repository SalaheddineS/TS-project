import { Response } from "express";
import io from "socket.io-client";
import { RequestWithUser } from "../../Overriden_Interfaces/RequestWithUser";

const testingSocket = (req: RequestWithUser, res: Response) => {
  const socket = io("http://localhost:3000");
  socket.emit("message", `Hello from client with the id ${req.user._id}`);
  res.status(200).json({ message: "Socket message is emmited" });
};

const ChattingController = {
  testingSocket,
};

export default ChattingController;
