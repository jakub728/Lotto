import React from "react";
import { useSavedResults } from "../../hooks/useSavedResults";
import { api } from "../../api/axios";

export default function SavedData() {
  const { data: saved = [], isLoading, refetch } = useSavedResults();

  const handleDelete = async (id) => {
    try {
      await api.delete(`/saved/user/savedNumbers/${id}`, {
        withCredentials: true,
      });

      queryClient.invalidateQueries({ queryKey: ["saved"] });
    } catch (error) {
      console.error("Failed to delete entry:", error);
    }
  };

  if (isLoading) {
    return <img src="7471270.png" className="spinner" alt="Loading..." />;
  }

  return (
    <div className="saved-wrapper">
      <h2>Saved Numbers</h2>
      {saved.length === 0 ? (
        <p>No saved numbers</p>
      ) : (
        saved.map((entry) => (
          <div className="saved-1" key={entry._id}>
            <p>{entry.date}</p>
            <div className="saved-2">
              {entry.five?.map((num, i) => (
                <div className="five" key={i}>
                  {num}
                </div>
              ))}
              {entry.two?.map((num, i) => (
                <div className="two" key={i}>
                  {num}
                </div>
              ))}
            </div>
            <button
              className="delete-button"
              onClick={() => handleDelete(entry._id)}
            >
              Delete
            </button>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}
