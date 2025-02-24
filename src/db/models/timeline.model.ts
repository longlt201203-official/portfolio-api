import mongoose, { HydratedDocument, Model, Schema, Types } from "mongoose";

export interface ITimelineItem {
	time: string;
	title: string;
	content: string[];
}

export interface ITimeline {
	items: ITimelineItem[];
}

export type TimelineDocumentType = HydratedDocument<
	ITimeline,
	{
		items: Types.DocumentArray<ITimelineItem>;
	}
>;

export type TimelineModelType = Model<
	ITimeline,
	{},
	{},
	{},
	TimelineDocumentType
>;

const TimelineItemSchema = new Schema<ITimelineItem>({
	time: { type: String, required: true },
	title: { type: String, required: true },
	content: { type: [String], required: true },
});

const TimelineSchema = new Schema<ITimeline, TimelineModelType>({
	items: { type: [TimelineItemSchema] },
});

export const TimelineModel = mongoose.model<ITimeline, TimelineModelType>(
	"Timeline",
	TimelineSchema,
);
