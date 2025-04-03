"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("@repo/common-backend/config");
const wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on("connection", (ws, request) => {
    const url = request.url;
    if (!url) {
        return;
    }
    const params = new URLSearchParams(url.split("?")[1]);
    const token = params.get("token") || "";
    const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
    if (!decoded || !decoded.userId) {
        ws.close();
        return;
    }
    ws.on("message", (data) => {
        ws.send("pong");
    });
});
