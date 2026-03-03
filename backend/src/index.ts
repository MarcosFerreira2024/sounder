import express from "express";
import "reflect-metadata";
import "./shared/container";
import { Server } from "./configs/server";
import dotenv from "dotenv";

dotenv.config();
const server = new Server();

export default server.app;
