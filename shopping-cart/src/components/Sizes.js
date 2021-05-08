import React from 'react';

const Sizes = (props) => {
  return (
    <div className="sizes">
      {
        props.sizes.map((size, idx) => (
          <button key={idx}>{size}</button>
        ))
      }
    </div>
  );
}

export default Sizes;
