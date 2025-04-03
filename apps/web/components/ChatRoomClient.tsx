"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export default function ChatRoomClient({
    messages,
    id
}: {
    messages: {message: string}[],
    id: string
}
) {
    const [chats, setChats] = useState(messages);
    const [message, setMessage] = useState("");
    const {socket, loading} = useSocket();

    useEffect(() => {
        if (socket && !loading) {
            socket.send(JSON.stringify({
                type: "join_room",
                roomId: id
            }));

            socket.onmessage = (event) => {
                const parsedData = JSON.parse(event.data.toString());
                if (parsedData.type === "chat") {
                    setChats(c => [...c, parsedData.message]);
                }
            };
        }
    }, [socket, loading, id]);

    return (
        <div>
            {chats.map((m, i) => <div key={i}>{m.message}</div>)}
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={() => {
                socket?.send(JSON.stringify({
                    type: "chat",
                    roomId: id,
                    message: message
                }));
            }}>Send Message</button>
        </div>
    );
}