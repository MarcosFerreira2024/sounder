import express from "express";
import "reflect-metadata";
import "./shared/container.js";
import { Server } from "./configs/server.js";
import dotenv from "dotenv";

dotenv.config();
const server = new Server();

export default server.app;
