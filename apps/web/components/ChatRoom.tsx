import axios from "axios";
import { BACKEND_URL } from "../app/room/[slug]/config";
import ChatRoomClient from "./ChatRoomClient";

async function getChats(roomId: string) {
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    return response.data.chats;
}

export default async function ChatRoom({ id }: { id: string }) {
    const messages = await getChats(id);

    return (
        <ChatRoomClient 
            id={id} 
            messages={messages} 
        />
    );
}