import {Request, Response } from "express";
import Organization from "../database/models/organization";

interface OrganizationBody {
    name: string;
    profilePicture?: string;
    email: string;
    phoneNumber: string;
    contactPerson: {
        firstName: string;
        lastName: string;
    };
    password: string;
}
// Get all organizations
export async function getOrganizations(req: Request, res: Response) {
    try {
        const organizations = await Organization.find();
        return res.status(200).json(organizations);
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
        return res.status(200).json(organization);
    } catch (error) {
        return res.status(400).json({ message: "Invalid organization id" });
    }
}

// Create a new organization
export async function createOrganization(req: Request, res: Response) {
    const organizationBody = req.body as OrganizationBody;

    if (!organizationBody) {
        return res.status(400).json({ message: "Invalid organization body" });
    }

    if (!organizationBody.name || !organizationBody.email || !organizationBody.phoneNumber || !organizationBody.contactPerson || !organizationBody.password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const newOrganization = new Organization(organizationBody);
        const savedOrganization = await newOrganization.save();
        return res.status(201).json(savedOrganization);
    } catch (error) {
        return res.status(500).json({ message: "Error creating organization", error });
    }
}

// Update an existing organization
export async function updateOrganization(req: Request, res: Response) {
    const organizationId = req.params.id;
    const organizationBody = req.body as OrganizationBody;

    if (!organizationId || !organizationBody) {
        return res.status(400).json({ message: "Invalid organization id or body" });
    }

    try {
        const organization = await Organization.findById(organizationId);
        if (!organization) {
            return res.status(404).json({ message: "Organization not found" });
        }

        const updatedOrganization = await Organization.findByIdAndUpdate(organizationId, organizationBody, { new: true });
        return res.status(200).json(updatedOrganization);
    } catch (error) {
        return res.status(400).json({ message: "Error updating organization", error });
    }
}

// Delete an organization
export async function deleteOrganization(req: Request, res: Response) {
    const organizationId = req.params.id;

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
        return res.status(400).json({ message: "Error deleting organization", error });
    }
}