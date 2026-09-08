import { useState } from "react";
import "./App.css";

const BOXES = Array.from({ length: 9 }, (_, i) => i + 1);

export default function App() {
  const [boxStates, setBoxStates] = useState({});

  const filledCount = Object.keys(boxStates).length;

  const handleBoxClick = (id) => {
    if (filledCount >= 9 || boxStates[id]) return;

    setBoxStates((prev) => ({
      ...prev,
      [id]: filledCount + 1,
    }));
  };

  const handleClear = () => {
    setBoxStates({});
  };

  return (
    <div className="container">
      <h1 className="title">- Time 1Hr -</h1>

      <div className="grid">
        {BOXES.map((id) => (
          <div
            key={id}
            onClick={() => handleBoxClick(id)}
            className="box"
          >
            {boxStates[id] || ""}
          </div>
        ))}
      </div>

      <button onClick={handleClear} className="clear-btn">
        Clear
      </button>
    </div>
  );
}