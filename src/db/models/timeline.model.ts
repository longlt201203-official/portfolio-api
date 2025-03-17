import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export interface ITimeline {
	time: string;
	title: string;
	content: string[];
	sort: number;
	createdAt: Date;
}

export type TimelineDocumentType = HydratedDocument<ITimeline>;

export type TimelineModelType = Model<
	ITimeline,
	{},
	{},
	{},
	TimelineDocumentType
>;

const TimelineSchema = new Schema<ITimeline, TimelineModelType>({
	time: { type: String, required: true },
	title: { type: String, required: true },
	content: { type: [String], required: true },
	sort: { type: Number, required: true, default: 0 },
	createdAt: { type: Date, required: true, default: () => new Date() },
});

export const TimelineModel = mongoose.model<ITimeline, TimelineModelType>(
	"Timeline",
	TimelineSchema,
);
