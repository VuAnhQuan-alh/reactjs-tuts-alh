import React, { useContext, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Colors from './Colors';
import { DataContext } from './DataProvider';
import DetailThumb from './DetailThumb';
import Sizes from './Sizes';

const Details = () => {
  const { id } = useParams();
  const { products: [products], addCart } = useContext(DataContext);
  const [index, setIndex] = useState(0);
  const imgDiv = useRef();

  const result = products.find(prod => prod._id === id);
  const handleMouseMove = e => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.pageX - left) / width * 100;
    const y = (e.pageY - top) / height * 100;
    imgDiv.current.style.backgroundPosition = `${x}% ${y}%`;
  }

  return (
    <div className="details" key={result._id}>
      <div
        className="img-detail"
        style={{
          backgroundImage: `url(${result.images[index]})`
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => imgDiv.current.style.backgroundPosition = `center`}
        ref={imgDiv}
      />
      <div className="box-detail">
        <h2>{result.title}</h2>
        <h3>${result.price}</h3>
        <Colors colors={result.colors} />
        <Sizes sizes={result.sizes} />
        <p>{result.description}</p>
        <p>{result.content}</p>
        <DetailThumb images={result.images} setIndex={setIndex} />
        <Link to="cart" className="btn-cart" onClick={() => addCart()}>Add to cart</Link>
      </div>
    </div>
  );
}

export default Details;
