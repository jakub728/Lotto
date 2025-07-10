import { Schema, model } from "mongoose";

const resultsSchema = new Schema({
  number: { type: Number },
  date: { type: String },
  five: { type: Array },
  two: { type: Array },
});

const ResultsModel = model("results", resultsSchema);

export default ResultsModel;
