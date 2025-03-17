import { S3Client } from "@aws-sdk/client-s3";
import { Env } from "./env";

export const s3Client = new S3Client({
	endpoint: Env.S3_ENDPOINT,
});

export function getS3Filepath(key: string) {
	return `/files/${Env.S3_BUCKET}/${key}`;
}
