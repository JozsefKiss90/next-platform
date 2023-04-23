import { useState, useEffect } from "react";

export default function ProgressBar({ completed }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(completed);
  }, [completed]);

  const containerStyles = {
    width: '30%',
    height: '20px',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 0,
  };

  const fillerStyles = {
    height: "100%",
    width: `${width}%`,
    backgroundColor: "rgb(0, 220, 29)",
    borderRadius: "inherit",
    transition: "width 1s ease-in-out",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${width}%`}</span>
      </div>
    </div>
  );
}
