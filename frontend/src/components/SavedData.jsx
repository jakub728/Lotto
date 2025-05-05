import React from "react";
import { useState, useEffect } from "react";

export default function SavedData() {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const allItems = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("numbers-")) {
        try {
          const item = JSON.parse(localStorage.getItem(key));
          allItems.push(item);
        } catch (err) {
          console.error(err);
        }
      }
    }
    setSaved(allItems);
  }, []);

  function handleDelete(id) {
    localStorage.removeItem(`numbers=${id}`);

    // setSaved((prev) => prev.filter((entry) => entry.id !== id));
  }

  return (
    <div className="saved-results">
      <h2>Saved Numbers</h2>
      {saved.length === 0 ? (
        <p>No saved numbers</p>
      ) : (
        saved.map((entry, index) => (
          <div key={entry.id || index} className="generate-2">
            <p>
              {entry.date} {entry.time}
            </p>
            {entry.five.map((num, i) => (
              <div className="five" key={i}>
                {num}
              </div>
            ))}
            {entry.two.map((num, i) => (
              <div className="two" key={i}>
                {num}
              </div>
            ))}
            <button className="delete-button" onClick={handleDelete(entry.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
