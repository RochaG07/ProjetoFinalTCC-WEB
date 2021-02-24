import {io} from "socket.io-client";

export const socket = io("http://localhost:3434");

export const chatSocket = io("http://localhost:3434/chat");

//export default socket;