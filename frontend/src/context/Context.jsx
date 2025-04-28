import { createContext, useState } from "react";
import resultArr from "./resultArr.js";

export const DataContext = createContext();

export default function DataProvider({ children }) {
  const [data, setData] = useState(null);
  const [lastResults, setLastResults] = useState(resultArr);
  return (
    <DataContext.Provider
      value={{ data, setData, lastResults, setLastResults }}
    >
      {children}
    </DataContext.Provider>
  );
}
