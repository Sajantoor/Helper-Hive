import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import db, { connectDB } from "./database/db";
import { createEvent, deleteEvent, getEvent, getEvents, updateEvent } from "./routes/events";
import { getOrganizations, getOrganization, registerOrganization, updateOrganization, deleteOrganization } from "./routes/organizations";
import { getUser, registerUser, updateUser, deleteUser } from "./routes/user";
import { authorize, authorizeOrganization, authorizeUser, renewToken } from "./middlewares/authentication";
import { confirmAccount, forgotPassword, login, logout, profile, resetForgottenPassword, resetPassword } from "./routes/login";
import { getUserFutureEvents, getUserPastEvents, getOrganizationEvents, registerForEvent, deregisterForEvent } from "./routes/registration";
import { getS3SecureURL } from "./routes/s3";

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
const port = 4000;
connectDB();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get("/health", (req, res) => {
    res.send("UP!");
});

const API_PREFIX = "/api";
const EVENTS_API = `${API_PREFIX}/events`;
const ORGANIZATIONS_API = `${API_PREFIX}/organizations`;
const USERS_API = `${API_PREFIX}/users`;
const REGISTRATION_API = `${API_PREFIX}/registrations`;

// Unauthenticated routes
app.post(`${API_PREFIX}/login`, login);
app.post(`${API_PREFIX}/reset-password/:id`, resetForgottenPassword);
app.post(`${API_PREFIX}/forgot-password`, forgotPassword);
app.get(`${API_PREFIX}/confirm-account/:id`, confirmAccount);

app.post(`${ORGANIZATIONS_API}/register`, registerOrganization);
app.post(`${USERS_API}/register`, registerUser);

// Authenticated Routes
app.post(`${API_PREFIX}/logout`, authorize, logout);
app.post(`${API_PREFIX}/token`, authorize, renewToken);
app.get(`${API_PREFIX}/profile`, authorize, profile);
app.get(`${API_PREFIX}/upload`, getS3SecureURL);
app.post(`${API_PREFIX}/reset-password`, resetPassword);

app.get(`${EVENTS_API}`, getEvents);
app.get(`${EVENTS_API}/:id`, authorize, getEvent);
app.post(`${EVENTS_API}`, authorize, authorizeOrganization, createEvent);
app.patch(`${EVENTS_API}/:id`, authorize, authorizeOrganization, updateEvent);
app.delete(`${EVENTS_API}/:id`, authorize, authorizeOrganization, deleteEvent);

app.get(`${ORGANIZATIONS_API}`, authorize, getOrganizations);
app.get(`${ORGANIZATIONS_API}`, authorize, getOrganization);
app.patch(`${ORGANIZATIONS_API}`, authorize, authorizeOrganization, updateOrganization);
app.delete(`${ORGANIZATIONS_API}`, authorize, authorizeOrganization, deleteOrganization);

app.get(`${USERS_API}/:id`, authorize, getUser);
app.patch(`${USERS_API}`, authorize, authorizeUser, updateUser);
app.delete(`${USERS_API}`, authorize, authorizeUser, deleteUser);

app.get(`${REGISTRATION_API}/future`, authorize, getUserFutureEvents);
app.get(`${REGISTRATION_API}/past`, authorize, getUserPastEvents);
app.get(`${REGISTRATION_API}/organization/:id/events`, authorize, getOrganizationEvents);
app.post(`${REGISTRATION_API}/register/event/:id`, authorize, authorizeUser, registerForEvent);
app.post(`${REGISTRATION_API}/deregister/event/:id`, authorize, authorizeUser, deregisterForEvent);

// Fallback route
app.use((_req, res) => {
    res.status(404).send('Not Found');
});


