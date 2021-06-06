import React from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';


const BtnRender = ({ prod, del }) => {
  const { userAPI: { isAdmin: [isAdmin], addCart } } = React.useContext(GlobalState);

  return (
    <div className="row_btn">
      {
        isAdmin ?
          <>
            <Link id="btn_buy" to="#!" onClick={() => del(prod)}>
              Delete
            </Link>
            <Link id="btn_view" to={`/edit-prod/${prod._id}`}>
              Edit
            </Link>
          </>
          :
          <>
            <Link id="btn_buy" to="#!" onClick={() => addCart(prod)}>
              Buy
            </Link>
            <Link id="btn_view" to={`/detail/${prod._id}`}>
              View
            </Link>
          </>
      }
    </div>
  );
}

export default BtnRender;
