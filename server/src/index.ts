import express from "express";
import db, { connectDB } from "./database/db";
import { createEvent, getEvent, getEvents, updateEvent } from "./routes/events";

const app = express();
const port = 4000;
connectDB();

app.use(express.json());
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get("/health", (req, res) => {
    res.send("UP!");
});

const API_PREFIX = "/api/v1";
const EVENTS_API = `${API_PREFIX}/events`;

app.get(`${EVENTS_API}`, (req, res) => getEvents(req, res));
app.get(`${EVENTS_API}/:id`, (req, res) => getEvent(req, res));
app.post(`${EVENTS_API}`, (req, res) => createEvent(req, res));
app.patch(`${EVENTS_API}/:id`, (req, res) => updateEvent(req, res));
