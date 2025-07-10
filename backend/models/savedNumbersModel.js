import { Schema, model } from "mongoose";

const required = true
const unique = true
const trim = true


const savedSchema = new Schema({
  number: { type: Number },
  date: { type: String },
  five: { type: [], min: 5, max: 5},
  two: { type: [], min: 2, max: 2},
});

export const SavedNumbersModel = model("Saved", savedSchema)