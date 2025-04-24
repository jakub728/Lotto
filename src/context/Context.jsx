import { createContext, useState } from "react";

export const DataContext = createContext();

export default function DataProvider({ children }) {
  const [data, setData] = useState(null);
  const [lastResults, setLastResults] = useState([
    {
      date: "08.04.2025",
      dateId: 554,
      five: [17, 29, 40, 41, 47],
      two: [5, 8],
    },
    {
      date: "11.04.2025",
      dateId: 555,
      five: [2, 26, 27, 28, 49],
      two: [1, 10],
    },
    {
      date: "15.04.2025",
      dateId: 556,
      five: [8, 11, 13, 33, 35],
      two: [1, 10],
    },
    {
      date: "18.04.2025",
      dateId: 557,
      five: [7, 8, 12, 29, 44],
      two: [3, 12],
    },
  ]);
  return (
    <DataContext.Provider
      value={{ data, setData, lastResults, setLastResults }}
    >
      {children}
    </DataContext.Provider>
  );
}
