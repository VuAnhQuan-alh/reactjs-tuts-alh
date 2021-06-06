import axios from 'axios';
import React from 'react';

export default function CateAPI() {
  const [cates, setCates] = React.useState([]);
  const [callback, setCallback] = React.useState(false);
  const list = async () => {
    const res = await axios.get('http://localhost:2213/api/category')
    setCates(res.data);
  };

  React.useEffect(() => {
    list();
  }, [callback]);

  return {
    cates: [cates, setCates],
    callback: [callback, setCallback]
  }
}
