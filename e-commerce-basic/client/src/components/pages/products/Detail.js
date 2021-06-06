import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';
import Item from '../utils/prodItem/Product';

export default function Detail() {
  const {
    prodAPI: {
      related: [related]
    },
    userAPI: { addCart }
  } = useContext(GlobalState);
  const [deProd, setDeProd] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const product = related.find(prod => prod._id === id);
      product && setDeProd(product);
    }
    window.scroll(0, 0);
  }, [id, related]);

  if (deProd.length === 0) return null;

  return (
    <>
      <div className="product_detail">
        <img src={deProd.images.url} alt="product detail" />
        <div className="box-detail">
          <div className="row">
            <h2>{deProd.title}</h2>
            <h6>#id: {deProd.prod_id}</h6>
          </div>
          <span>$ {deProd.price}</span>
          <p>
            {deProd.description} Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Hic nobis sunt cupiditate ab tempore veniam itaque quo delectus deserunt? Ad!
          </p>
          <p>{deProd.content}</p>
          <p>Sold: {deProd.sold}</p>
          <Link
            to="/cart"
            className="cart"
            onClick={() => addCart(deProd)}
          >Buy now</Link>
        </div>
      </div>

      <div className="">
        <h2>Related products</h2>
        <div className="products">
          {
            related.map((prod, idx) => {
              return prod.category === deProd.category && prod._id !== id
                ? <Item key={idx} product={prod} />
                : null;
            })
          }
        </div>
      </div>
    </>
  )
}
