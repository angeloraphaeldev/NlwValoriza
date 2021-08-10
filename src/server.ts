import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes";
import "express-async-errors";
import "reflect-metadata";
import "./database";

const app = express();

app.use(express.json());
app.use(router);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message });
  }
  return res
    .status(500)
    .json({ status: "error", message: "Internal Server Error" });
});

app.listen(3333, () => console.log("Server is Running"));