import { Schema, model, models, type Document, type Types } from 'mongoose';

export interface IMeeting extends Document {
  projectId?: Types.ObjectId;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  createdBy: Types.ObjectId;
  attendees: string[];
  createdAt: Date;
  updatedAt: Date;
}

const MeetingSchema = new Schema<IMeeting>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    attendees: [{ type: String }],
  },
  { timestamps: true },
);

export default models.Meeting || model<IMeeting>('Meeting', MeetingSchema);
