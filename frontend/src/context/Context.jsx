import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export default function DataProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://lotto-backend-pfhh.onrender.com/api/results"
        );
        if (!response.ok) {
          throw new Error(`Could not fetch data: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, [setData]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}
