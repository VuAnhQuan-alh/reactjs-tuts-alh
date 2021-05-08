import React from 'react';

export default function DetailThumb({ images, setIndex }) {
  return (
    <div className="thumb">
      {
        images.map((img, idx) => (
          <img src={img} key={idx}
            alt="images"
            onClick={() => setIndex(idx)}
          />
        ))
      }
    </div>
  );
}
