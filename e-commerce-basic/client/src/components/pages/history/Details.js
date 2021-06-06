import React from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../../../GlobalState';

export default function OrderDetail() {
  const { userAPI: { history: [history] } } = useGlobalContext();
  const [order, setOrder] = React.useState(null);
  const { id } = useParams();

  React.useEffect(() => {
    if (id) {
      const detail = history.find(item => item._id === id);
      setOrder(detail);
    }
  }, [id, history]);

  if (!order) return null;

  return (
    <div className="history-page">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Country Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{order.address.recipient_name}</td>
            <td>{order.address.line1 + ' - ' + order.address.city}</td>
            <td>{order.address.postal_code}</td>
            <td>{order.address.country_code}</td>
          </tr>
        </tbody>
      </table>

      <table style={{margin: '30px 0px'}}>
        <thead>
          <tr>
            <th></th>
            <th>Products</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {
            order.cart.map((item, idx) => (
              <tr key={idx}>
                <td><img src={item.images.url} alt="" width="150px" /></td>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>$ {item.price * item.quantity}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
