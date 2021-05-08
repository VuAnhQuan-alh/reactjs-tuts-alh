import React from 'react';

export default function Colors({ colors }) {
  return (
    <div className="colors">
      {
        colors.map((col, idx) => (
          <button key={idx} style={{ backgroundColor: col }}></button>
        ))
      }
    </div>
  );
}
