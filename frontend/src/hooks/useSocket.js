import { useContext } from "react";
import { SocketContext } from "../context/Socket";

export const useSocket = () => {
	return useContext(SocketContext)
}