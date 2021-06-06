import axios from 'axios';
import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';
import Item from '../utils/prodItem/Product';
import Filters from './Filters';
import LoadMore from './LoadMore';

export default function Products() {
  const {
    prodAPI: {
      prods: [prods, setProds],
      callback: [callback, setCallback],
      // eslint-disable-next-line no-unused-vars
      messy: [messy, setMessy]
    },
    userAPI: {
      isAdmin: [isAdmin]
    },
    token: [token],
  } = useContext(GlobalState);
  const [isCheck, setIsCheck] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const checkAll = () => {
    const prodsCheckAll = prods.map(item => {
      item.checked = !isCheck;
      return item;
    });
    setIsCheck(!isCheck);
    setProds(prodsCheckAll);
  };

  const del = async (prod) => {
    await axios.post('/api/destroy', { public_id: prod.images.public_id }, {
      headers: { Authorization: token }
    });
    await axios.delete(`/api/product/${prod._id}`, {
      headers: { Authorization: token }
    });
  };
  const handleDeletes = async () => {
    setLoading(true);
    const prodsDel = [];
    prods.forEach(item => {
      if (item.checked === true) prodsDel.push(del(item));
    });
    Promise.all(prodsDel).then(() => {
      setCallback(!callback);
      setLoading(false);
    })
    .catch(error => {
      console.log(error);
    })
  };
  const handleRandom = () => {
    setMessy(true);
    setCallback(!callback);
  };
  const handleUnRandom = () => {
    setMessy(false);
    setCallback(!callback);
  };
  const styleBtn = {
    textTransform: 'center',
    border: '1px solid #ccc',
    padding: '10px 18px',
    background: 'aqua',
    marginRight: '10px'
  }

  return (
    <>
      {
        isAdmin &&
        <div className="header_delete">
          {
            loading ?
              <div className="loading">
                <Loading />
              </div>
            : null
          }
          <div className="delete_all">
            <span>Select All</span>
            <input type="checkbox" checked={isCheck} onChange={() => checkAll()} />
            <button onClick={() => handleDeletes()}>Delete All</button>
          </div>
        </div>
      }
      <Filters />
      <button type="button" style={styleBtn} onClick={handleRandom}>Messy</button>
      <button type="button" style={styleBtn} onClick={handleUnRandom}>Recurrent</button>
      <div className="products">
        {
          prods.map((prod, index) => {
            return <Item key={index} product={prod} />
          })
        }
      </div>
      {
        prods.length === 0 && <Loading />
      }
      <LoadMore />
    </>
  )
}
