import jwt from 'jsonwebtoken'
import { RequestHandler } from "express";

export const verifyTokenMiddleware: RequestHandler = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        // @ts-ignore because we don't have time to 
        // write safe types for req objects
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    next();
};