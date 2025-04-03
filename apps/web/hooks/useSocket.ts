import { useEffect, useState } from "react";
import { WebSocket } from "ws";
import { WS_URL } from "../app/room/[slug]/config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(WS_URL);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, []);

    return {
        socket, 
        loading
    }
}