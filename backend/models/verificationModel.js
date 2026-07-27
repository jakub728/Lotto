import { Schema, model } from "mongoose";

const verificationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, default: Date.now, expires: 86400 },
  },
  { timestamps: true },
);

export const Verification = model("Verification", verificationSchema);
