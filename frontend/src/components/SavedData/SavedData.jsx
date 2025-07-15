import { useState, useEffect } from "react";
import { data } from "react-router-dom";

export default function SavedData() {
  const [saved, setSaved] = useState([]);
  
  useEffect(() => {
    const receveNumbers = async () => {
      const config = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    }
 
    try {
      const response = await fetch("https://lotto-backend-pfhh.onrender.com/saved/user/savedNumbers", config)
      const data = await response.json()

      if (!response.ok) {
        console.error("Error:", data);
        return
      }

      setSaved(data)
    } catch (error) {
      console.error(error)
    }
  }
  receveNumbers()
    
  }, [])
  
  console.log(
    saved
  );
  



  const receveNumbers = async () => {
      const config = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    }
 
    try {
      const response = await fetch("https://lotto-backend-pfhh.onrender.com/saved/user/savedNumbers", config)
      const data = await response.json()

      if (!response.ok) {
        console.error("Error:", data);
        return
      }

      setSaved(data)
    } catch (error) {
      console.error(error)
    }
  }

  
  


  const handleDelete = async (id) => {
    const config = {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    }

    try {
      const response = await fetch(`https://lotto-backend-pfhh.onrender.com/saved/user/savedNumbers/${id}`, config)

      if (!response.ok) {
        console.error("Error")
      }

     setSaved((prev) => prev.filter((entry) => entry._id !== id));


    } catch (error) {
      console.error(error)
    }
  }

  
  


  return (
    <div className="saved-wrapper">
      <h2>Saved Numbers</h2>
      {saved.length === 0 ? (
        <p>No saved numbers</p>
      ) : (
        saved.map((entry, index) => (
          <div className="saved-1" key={index}>
            <p>
              {entry.date}
            </p>
            <div key={entry._id} className="saved-2">
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
            </div>
            <button
              className="delete-button"
              onClick={() => {
                handleDelete(entry._id);
              }}
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
