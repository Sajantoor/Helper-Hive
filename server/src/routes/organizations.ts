import { Request, Response } from "express";
import Organization from "../database/models/organization";
import { hashPassword } from "../middlewares/authentication";
import { z } from 'zod';
import User from "../database/models/user";
import { createConfirmRegistrationEmail } from "../utils/email";

interface ContactPerson {
    firstName: string;
    lastName: string;
}

const organizationSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
    contactPerson: z.object({
        firstName: z.string(),
        lastName: z.string(),
    }),
    password: z.string(),
    avatar: z.string().url(),
});

const updateOrganizationSchema = organizationSchema.partial();

interface OrganizationResponse {
    name: string;
    email: string;
    phoneNumber: string;
    contactPerson: ContactPerson;
    avatar: string;
}

// TODO: Fix any type later
function filterOrganizationResponse(organization: any): OrganizationResponse {
    const organizationResponse = organization.toObject();
    delete organizationResponse.password;
    delete organizationResponse.__v;
    return organizationResponse;
}

// Get all organizations
export async function getOrganizations(req: Request, res: Response) {
    try {
        const organizations = await Organization.find();
        const filteredOrganizations = organizations.map((organization) => filterOrganizationResponse(organization));
        return res.status(200).json(filteredOrganizations);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching organizations" });
    }
}

// Get a single organization by ID
export async function getOrganization(req: Request, res: Response) {
    const organizationId = req.params.id;

    if (!organizationId) {
        return res.status(400).json({ message: "Invalid organization id" });
    }

    try {
        const organization = await Organization.findById(organizationId);
        if (!organization) {
            return res.status(404).json({ message: "Organization not found" });
        }

        const organizationResponse = filterOrganizationResponse(organization);
        return res.status(200).json(organizationResponse);
    } catch (error) {
        return res.status(400).json({ message: "Invalid organization id" });
    }
}

// Create a new organization
export async function registerOrganization(req: Request, res: Response) {
    const organizationBody = organizationSchema.safeParse(req.body);

    if (!organizationBody.success) {
        return res.status(400).json({ message: "Invalid organization body", error: organizationBody.error.errors });
    }

    organizationBody.data.email = organizationBody.data.email.toLowerCase();
    organizationBody.data.password = await hashPassword(organizationBody.data.password);

    // check if there's a user with the same email
    const user = await User.findOne({
        email: organizationBody.data.email,
    });

    if (user) {
        return res.status(400).json({ message: "Email already in use" });
    }

    try {
        const newOrganization = new Organization(organizationBody.data);
        const savedOrganization = await newOrganization.save();
        await createConfirmRegistrationEmail({
            userId: savedOrganization.id as string,
            isOrganization: true,
            accountConfirmed: savedOrganization.emailConfirmed,
        }, savedOrganization.email);
        const organizationResponse = filterOrganizationResponse(savedOrganization);
        return res.status(201).json(organizationResponse);
    } catch (error) {
        return res.status(500).json({ message: "Error creating organization", error });
    }
}

// Update an existing organization
export async function updateOrganization(req: Request, res: Response) {
    const organizationId = res.locals.user.userId;
    if (!organizationId) {
        return res.status(400).json({ message: "Invalid organization id" });
    }

    const organizationBody = updateOrganizationSchema.safeParse(req.body);

    if (!organizationBody.success) {
        return res.status(400).json({ message: "Invalid organization body", error: organizationBody.error.errors });
    }

    if (organizationBody.data.password) {
        return res.status(400).json({ message: "Password cannot be updated using this endpoint" });
    }

    if (organizationBody.data.email) {
        return res.status(400).json({ message: "Email cannot be updated" });
    }

    try {
        const organization = await Organization.findById(organizationId);
        if (!organization) {
            return res.status(404).json({ message: "Organization not found" });
        }

        const updatedOrganization = await Organization.findByIdAndUpdate(organizationId, organizationBody.data, { new: true });
        const organizationResponse = filterOrganizationResponse(updatedOrganization);
        return res.status(200).json(organizationResponse);
    } catch (error) {
        return res.status(500).json({ message: "Failed to update organization", error });
    }
}

// Delete an organization
export async function deleteOrganization(res: Response) {
    const organizationId = res.locals.user.userId;

    if (!organizationId) {
        return res.status(400).json({ message: "Invalid organization id" });
    }

    try {
        const organization = await Organization.findByIdAndDelete(organizationId);
        if (!organization) {
            return res.status(404).json({ message: "Organization not found" });
        }
        return res.status(200).json({ message: "Organization deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Failed deleting organization", error });
    }
}