import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common-backend/config";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    ws: WebSocket;
    rooms: string[];
    userId: string;
}

const users: User[] = [];

function checkUser(token: string): string | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string") {
        return null;
    }

    if (!decoded || !(decoded as JwtPayload).userId) {
        return null;
    }

        return decoded.userId;
    } catch (error) {
        return null;
    }
}

wss.on("connection", (ws, request) => {
    const url = request.url;
    if (!url) {
        return;
    }

    const params = new URLSearchParams(url.split("?")[1]);
    const token = params.get("token") || "";

    const userId = checkUser(token);
    
    if (!userId) {
        ws.close(1008, "Invalid authentication token");
        return null;
    }

    users.push({
        rooms: [],
        userId,
        ws: ws as unknown as WebSocket,
    });

    // Handle client disconnection
    ws.on("close", () => {
        const index = users.findIndex(user => user.ws === (ws as unknown as WebSocket));
        if (index !== -1) {
            users.splice(index, 1);
        }
    });

    // Handle WebSocket errors
    ws.on("error", (error) => {
        console.error("WebSocket error:", error);
        const index = users.findIndex(user => user.ws === (ws as unknown as WebSocket));
        if (index !== -1) {
            users.splice(index, 1);
        }
    });

    ws.on("message", async (data) => {
        try {
            const parsedData = JSON.parse(data as unknown as string);
            console.log("Received message:", parsedData);

            if (!parsedData.type) {
                console.error("Message missing type:", parsedData);
                return;
            }

            if (parsedData.type === "join_room") {
                const user = users.find(user => user.ws === (ws as unknown as WebSocket));
                if (user) {
                    user.rooms.push(parsedData.roomId);
                    console.log(`User ${userId} joined room ${parsedData.roomId}`);
                }
            }

            if (parsedData.type === "leave_room") {
                const user = users.find(user => user.ws === (ws as unknown as WebSocket));
                if (user) {
                    user.rooms = user?.rooms.filter(room => room !== parsedData.roomId);
                    console.log(`User ${userId} left room ${parsedData.roomId}`);
                }
            }

            if (parsedData.type === "chat") {
                const roomId = parsedData.roomId;
                const message = parsedData.message;

                if (!roomId || !message) {
                    console.error("Chat message missing required fields:", parsedData);
                    return;
                }

                await prismaClient.chat.create({
                    data: {
                        roomId,
                        message,
                        userId: userId as string,
                    }
                });

                users.forEach(user => {
                    if (user.rooms.includes(roomId)) {
                        try {
                            user.ws.send(JSON.stringify({
                                type: "chat",
                                message: message,
                                roomId,
                                userId
                            }));
                        } catch (error) {
                            console.error("Error sending message to user:", error);
                            // Remove the user if we can't send to them
                            const index = users.findIndex(u => u.ws === user.ws);
                            if (index !== -1) {
                                users.splice(index, 1);
                            }
                        }
                    }
                });
            }
        } catch (error) {
            console.error("Error processing message:", error);
            ws.send(JSON.stringify({
                type: "error",
                message: "Failed to process message"
            }));
        }
    });
})
