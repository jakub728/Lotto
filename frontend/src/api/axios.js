import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.lotto-gen.pl",
  timeout: 10000,
});
