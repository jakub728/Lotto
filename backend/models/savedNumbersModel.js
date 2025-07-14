import { Schema, model } from "mongoose";

const required = true
const unique = true
const trim = true


const savedSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  number: { type: Number },
  date: { type: String },
  five: { type: []},
  two: { type: []},
});

export const SavedNumbersModel = model("Saved", savedSchema)