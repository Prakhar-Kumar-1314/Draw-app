import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { middleware }  from "./middleware.js";
import { JWT_SECRET } from "@repo/common-backend/config";
import { CreateRoomSchema, CreateUserSchema, SignInSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();
app.use(express.json());

app.post("/signup", async (req: Request, res: Response) => {
        const parsedData = CreateUserSchema.safeParse(req.body);

        if (!parsedData.success) {
            res.status(400).json({
                message: "INVALID_REQUEST_BODY",
            });
            return;
        }

        try {
                const user = await prismaClient.user.create({
                data: {
                    email: parsedData.data?.username,
                    password: parsedData.data.password,
                    name: parsedData.data.name,
                }
            });

            res.status(201).json({
                message: "USER_CREATED",
                user: user.id,
            });
            return;
        } catch (error) {
            res.status(400).json({
                message: "User already exists",
            });
            return;
    }
})

app.post("/signin", async (req: Request, res: Response) => {
    const data = SignInSchema.safeParse(req.body);

    if (!data.success) {
        res.status(400).json({
            message: "INVALID_REQUEST_BODY",
        });
        return;
    }
    
    try {
        const user = await prismaClient.user.findUnique({
            where: {
                email: data.data.username,
                password: data.data.password,
            }
        });

        if (!user) {
            res.status(401).json({
                message: "INVALID_CREDENTIALS",
            });
            return;
        }

        const token = jwt.sign({
            userId: user.id
        }, JWT_SECRET);

        res.json({
            message: "SIGNED_IN",
            token,
        });
    } catch (error) {
        res.status(500).json({
            message: "INTERNAL_SERVER_ERROR",
        });
    }
});

app.post("/room", middleware, async (req: Request, res: Response) => {
    const parsedData = CreateRoomSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(400).json({
            message: "INVALID_REQUEST_BODY",
        });
        return;
    }

    try {
        // @ts-ignore
        const userId = req.userId;

        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                // @ts-ignore
                adminId: req.userId,    
            }
        })

        if (!room) {
            res.status(400).json({
                message: "ROOM_NOT_CREATED",
            });
            return;
        } else {
            res.status(201).json({
                message: "ROOM_CREATED",
                roomId: room.id,
            });
            return;
        }
        
    } catch (error) {
        res.status(500).json({
            message: "Room already exists",
        });
    }
});

app.get("/chats/:roomId", middleware, async (req: Request, res: Response) => {
    const roomId = Number(req.params.roomId);

    if (!roomId) {
        res.status(400).json({
            message: "INVALID_ROOM_ID",
        });
        return;
    }
    const chats = await prismaClient.chat.findMany({
        where: {
            roomId: roomId,
        }, 
        orderBy: {
            createdAt: "desc",
        },
        take: 50
    })

    res.json({
        message: "CHATS_FETCHED",
        chats,
    });
})

app.get("/room/:slug", middleware, async (req: Request, res: Response) => {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: {
            slug: slug
        }
    })

    if (!room) {
        res.status(404).json({
            message: "ROOM_NOT_FOUND",
        });
        return;
    }

    res.json({
        message: "ROOM_FOUND",
        room,
    });
})

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});