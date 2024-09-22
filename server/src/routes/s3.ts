import { Request, Response } from "express";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import Crypto from "crypto";

const s3 = new S3({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
})

export async function getS3SecureURL(req: Request, res: Response) {
    const file = req.params.name;
    if (!file) {
        return res.status(400).json({ message: "File type is required" });
    }

    const randomKey = Crypto.randomUUID() + "/" + file;
    const s3Params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: randomKey,
    };

    try {
        const uploadUrl = await getSignedUrl(s3, new PutObjectCommand(s3Params), {
            expiresIn: 60,
        });

        return res.status(200).json({ uploadUrl });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to get signed URL" });
    }
}