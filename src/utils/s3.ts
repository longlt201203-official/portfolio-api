import { S3Client } from "@aws-sdk/client-s3";
import { Env } from "./env";

export const s3Client = new S3Client({
	region: Env.S3_REGION,
	forcePathStyle: true,
	...(Env.S3_ENDPOINT
		? {
				endpoint: Env.S3_ENDPOINT,
			}
		: {}),
	...(Env.AWS_ACCESS_KEY_ID && Env.AWS_SECRET_ACCESS_KEY
		? {
				credentials: {
					accessKeyId: Env.AWS_ACCESS_KEY_ID,
					secretAccessKey: Env.AWS_SECRET_ACCESS_KEY,
				},
			}
		: {}),
});

export function getS3Filepath(key: string) {
	return `/files/${key}`;
}
