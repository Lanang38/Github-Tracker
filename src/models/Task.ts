import { Schema, model, models, type Document, type Types } from "mongoose";

export type TaskStatus = "open" | "in_progress" | "in_review" | "merged" | "closed";

export interface ITask extends Document {
  projectId: Types.ObjectId;
  assigneeId?: Types.ObjectId;
  title: string;
  description?: string;
  progressPercent: number;
  status: TaskStatus;
  dueDate?: Date;
  githubIssue?: {
    number: number;
    url: string;
    type: "issue" | "pull_request";
  };
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    assigneeId: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    progressPercent: { type: Number, default: 0, min: 0, max: 100 },
    status: {
      type: String,
      enum: ["open", "in_progress", "in_review", "merged", "closed"],
      default: "open",
    },
    dueDate: { type: Date },
    githubIssue: {
      number: { type: Number },
      url: { type: String },
      type: { type: String, enum: ["issue", "pull_request"] },
    },
  },
  { timestamps: true }
);

export default models.Task || model<ITask>("Task", TaskSchema);
