import React from 'react';
import { useGlobalContext } from '../../../GlobalState';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function OrderHtr() {
  const {
    userAPI: {
      history: [history, setHistory],
      isAdmin: [isAdmin],
    },
    token: [token]
  } = useGlobalContext();


  React.useEffect(() => {
    if (token) {
      const getHistory = async () => {
        try {
          if (isAdmin) {
            const res = await axios.get('/api/payment', {
              headers: { Authorization: token }
            });
            setHistory(res.data);
          } else {
            const res = await axios.get('/user/history', {
              headers: { Authorization: token }
            });
            setHistory(res.data);
          }
        } catch (error) {
          alert(error.response.data.msg);
        }
      }
      getHistory();
    }
  }, [token, isAdmin, setHistory]);

  return (
    <div className="history-page">
      <h2>History</h2>

      <h4>You have {history.length} ordered.</h4>
      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Date of purchased</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            history.map((items, idx) => (
              <tr key={idx}>
                <td>{items.paymentID}</td>
                <td>{new Date(items.createdAt).toLocaleString()}</td>
                <td><Link to={`/history/${items._id}`}>View</Link></td>
              </tr>
            ))
          }
        </tbody>
        </table>
    </div>
  )
}
