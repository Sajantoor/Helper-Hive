import express from "express";
import cookieParser from "cookie-parser";
import db, { connectDB } from "./database/db";
import { createEvent, getEvent, getEvents, updateEvent } from "./routes/events";
import { getOrganizations, getOrganization, registerOrganization, updateOrganization, deleteOrganization } from "./routes/organizations";
import { getUser, registerUser, updateUser, deleteUser } from "./routes/user";
import { authorize } from "./middlewares/authentication";
import { login, logout } from "./routes/login";

const app = express();
app.use(express.json());
app.use(cookieParser());

const port = 4000;
connectDB();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get("/health", (req, res) => {
    res.send("UP!");
});

const API_PREFIX = "/api/v1";
const EVENTS_API = `${API_PREFIX}/events`;
const ORGANIZATIONS_API = `${API_PREFIX}/organizations`;
const USERS_API = `${API_PREFIX}/users`;

// Unauthenticated routes
app.post(`${API_PREFIX}/login`, (req, res) => login(req, res));
app.post(`${ORGANIZATIONS_API}/register`, registerOrganization);
app.post(`${USERS_API}/register`, registerUser);

app.use(authorize);
app.post(`${API_PREFIX}/logout`, (_req, res) => logout(res));

app.get(`${EVENTS_API}`, (req, res) => getEvents(req, res));
app.get(`${EVENTS_API}/:id`, (req, res) => getEvent(req, res));
app.post(`${EVENTS_API}`, (req, res) => createEvent(req, res));
app.patch(`${EVENTS_API}/:id`, (req, res) => updateEvent(req, res));

app.get(`${ORGANIZATIONS_API}`, getOrganizations);
app.get(`${ORGANIZATIONS_API}/:id`, getOrganization);
app.patch(`${ORGANIZATIONS_API}/:id`, updateOrganization);
app.delete(`${ORGANIZATIONS_API}/:id`, deleteOrganization);

app.get(`${USERS_API}/:id`, getUser);
app.patch(`${USERS_API}/:id`, updateUser);
app.delete(`${USERS_API}/:id`, deleteUser);

// TOOD: Handle 404 
