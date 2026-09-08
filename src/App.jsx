import { useState, useRef } from "react";
import "./App.css";

const BOXES = Array.from({ length: 9 }, (_, i) => i + 1);

export default function App() {
  const [boxStates, setBoxStates] = useState({});
  const gridRef = useRef(null);

  const filledCount = Object.keys(boxStates).length;
  const isComplete = filledCount === 9;

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

  // Keyboard navigation handler for the 3x3 grid
  const handleKeyDown = (e, index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    let nextIndex = index;

    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        nextIndex = col < 2 ? index + 1 : index;
        break;
      case "ArrowLeft":
        e.preventDefault();
        nextIndex = col > 0 ? index - 1 : index;
        break;
      case "ArrowDown":
        e.preventDefault();
        nextIndex = row < 2 ? index + 3 : index;
        break;
      case "ArrowUp":
        e.preventDefault();
        nextIndex = row > 0 ? index - 3 : index;
        break;
      case "Escape":
      case "r":
      case "R":
        e.preventDefault();
        handleClear();
        return;
      default:
        return;
    }

    if (nextIndex !== index && gridRef.current) {
      const buttons = gridRef.current.querySelectorAll("button.box");
      buttons[nextIndex]?.focus();
    }
  };

  return (
    <div className="page-wrapper">
      <div className="card-container">
        {/* Header Section */}
        <header className="header">
          <div className="badge">
            <span className="dot"></span>
            {isComplete ? "Completed" : "Interactive Sequence"}
          </div>
          <h1 className="title">Time 1Hr</h1>
          <p className="subtitle">
            Clicked: <strong>{filledCount}</strong> / 9
          </p>
        </header>

        {/* 3x3 Grid with Keyboard Support */}
        <div 
          ref={gridRef}
          className={`grid ${isComplete ? "grid-complete" : ""}`}
          role="grid"
          aria-label="3x3 Box Sequence Grid"
        >
          {BOXES.map((id, index) => {
            const stepNumber = boxStates[id];
            const isFilled = Boolean(stepNumber);

            return (
              <button
                key={id}
                onClick={() => handleBoxClick(id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={isFilled || isComplete}
                className={`box ${isFilled ? "box-filled" : ""}`}
                aria-label={`Box ${id}${isFilled ? `, selected step ${stepNumber}` : ""}`}
                tabIndex={0}
              >
                {isFilled && <span className="pop-in">{stepNumber}</span>}
              </button>
            );
          })}
        </div>

        {/* Footer / Controls */}
        <footer className="footer">
          <button
            onClick={handleClear}
            className="clear-btn"
            disabled={filledCount === 0}
          >
            Reset Sequence <kbd className="kbd-shortcut">R / Esc</kbd>
          </button>
        </footer>
      </div>
    </div>
  );
}

