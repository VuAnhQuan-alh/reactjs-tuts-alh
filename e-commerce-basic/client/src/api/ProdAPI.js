import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProdAPI() {
  const [prods, setProds] = useState([]);
  const [messy, setMessy] = useState(false);
  const [callback, setCallback] = useState(false);
  const [cate, setCate] = useState('');
  const [limit, setLimit] = useState(6);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [related, setRelated] = useState([]);

  const list = async () => {
    const url = `/api/product?title[regex]=${search}&limit=${limit}&page=${page}&sort=${sort}&${cate}`;
    const res = await axios.get(url);
    const result = messy ? res.data.products.sort(() => 0.5 - Math.random()) : res.data.products;
    setProds(result);
  };
  const amount = async () => {
    const res = await axios.get(`/api/product?${cate}`);
    setRelated(res.data.products);
    setTotal(res.data.result);
  };

  useEffect(() => {
    amount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prods, cate]);
  useEffect(() => {
    list();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback]);

  return {
    prods: [prods, setProds],
    related: [related, setRelated],
    messy: [messy, setMessy],
    callback: [callback, setCallback],
    cate: [cate, setCate],
    limit: [limit, setLimit],
    page: [page, setPage],
    search: [search, setSearch],
    sort: [sort, setSort],
    total: [total]
  }
}
