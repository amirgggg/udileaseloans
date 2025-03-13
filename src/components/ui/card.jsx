import React from "react";

const Card = ({ children }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px" }}>
      {children}
    </div>
  );
};

export default Card;
