import { Schema, model, models, type Document, type Types } from "mongoose";

export type ProjectStatus = "running" | "ended" | "pending";

export interface IProject extends Document {
  name: string;
  description?: string;
  ownerId: Types.ObjectId;
  members: Types.ObjectId[];
  targetPercent: number;
  progressPercent: number;
  status: ProjectStatus;
  githubRepo?: {
    owner: string;
    name: string;
    fullName: string;
    url: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    targetPercent: { type: Number, default: 100 },
    progressPercent: { type: Number, default: 0, min: 0, max: 100 },
    status: {
      type: String,
      enum: ["running", "ended", "pending"],
      default: "pending",
    },
    githubRepo: {
      owner: { type: String },
      name: { type: String },
      fullName: { type: String },
      url: { type: String },
    },
  },
  { timestamps: true }
);

export default models.Project || model<IProject>("Project", ProjectSchema);
