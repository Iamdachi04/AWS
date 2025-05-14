import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useState, useEffect } from "react";


function App() {
  const [data, setData] = useState("");
  async function fetchAssignmentData() {
    const url = "http://localhost:3001/api/get-answer";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`HTTP error fetching data: ${response.status} - ${errorBody}`);
        setData(`Error fetching data: ${response.status} - ${errorBody}`);
         return;
      }

      const json = await response.json();
      const resultString = typeof json.result === 'string' ? json.result : "Received unexpected data format";
      setData(resultString);
      console.log("Fetched data:", resultString);

    } catch (error) {
      console.error("Error fetching data:", error);
       setData(`Error fetching data: ${error}`);
    }
  }
  useEffect(() => {
    fetchAssignmentData();
    const intervalId = setInterval(() => {
      fetchAssignmentData();
    },2000);
    return () => {
      console.log("Clearing data fetching interval...");
      clearInterval(intervalId);
    }
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Echo (Assignment View)</h1>
      <div className="card">
        <p>Backend Assignment State (from GET /api/get-answer):</p>
        <span id="answer">{data}</span>
      </div>
      <p className="read-the-docs">
        This is a simplified frontend demonstrating fetching data from the backend's assignment endpoint and displaying it.
      </p>
    </>
  );
}

export default App;