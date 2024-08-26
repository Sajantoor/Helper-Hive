import express from "express";
import db, { connectDB } from "./database/db";
import { createEvent, getEvent, getEvents, updateEvent } from "./routes/events";
import { getOrganizations, getOrganization, createOrganization, updateOrganization, deleteOrganization } from "./routes/organizations";
import { getUser, createUser, updateUser, deleteUser } from "./routes/user";
import { getUserFutureEvents, getUserAllEvents, getOrganizationEvents, registerForEvent, deregisterForEvent } from "./routes/registration";
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
const ORGANIZATIONS_API = `${API_PREFIX}/organizations`;
const USERS_API = `${API_PREFIX}/users`;
const REGISTRATION_API = `${API_PREFIX}/registrations`; 

app.get(`${EVENTS_API}`, (req, res) => getEvents(req, res));
app.get(`${EVENTS_API}/:id`, (req, res) => getEvent(req, res));
app.post(`${EVENTS_API}`, (req, res) => createEvent(req, res));
app.patch(`${EVENTS_API}/:id`, (req, res) => updateEvent(req, res));

app.get(`${ORGANIZATIONS_API}`, getOrganizations);
app.get(`${ORGANIZATIONS_API}/:id`, getOrganization);
app.post(`${ORGANIZATIONS_API}`, createOrganization);
app.patch(`${ORGANIZATIONS_API}/:id`, updateOrganization);
app.delete(`${ORGANIZATIONS_API}/:id`, deleteOrganization);

app.get(`${USERS_API}/:id`, getUser);
app.post(`${USERS_API}`, createUser);
app.patch(`${USERS_API}/:id`, updateUser);
app.delete(`${USERS_API}/:id`, deleteUser);

app.get(`${REGISTRATION_API}/user/:id/future-events`, getUserFutureEvents);
app.get(`${REGISTRATION_API}/user/:id/all-events`, getUserAllEvents); // we can rename this to getPresentAndPastEvents
app.get(`${REGISTRATION_API}/organization/:id/events`, getOrganizationEvents);
app.post(`${REGISTRATION_API}/register`, registerForEvent);
app.post(`${REGISTRATION_API}/deregister`, deregisterForEvent);