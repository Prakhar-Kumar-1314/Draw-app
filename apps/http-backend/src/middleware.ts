import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common-backend/config";

export function middleware(req: Request, res: Response, next: NextFunction ) {
    const token = req.headers.authorization || "";

    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded) {
        res.status(401).json({
            message: "Unauthorized"
        });
        return;
    } else {
        // @ts-ignore
        req.userId = decoded.userId;
        next();
    }      
}