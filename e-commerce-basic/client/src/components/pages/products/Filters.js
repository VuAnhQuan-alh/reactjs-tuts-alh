/* eslint-disable no-unused-vars */
import React from 'react';
import { useGlobalContext } from '../../../GlobalState';

const Filters = () => {
  let {
    prodAPI: {
      messy: [messy, setMessy],
      callback: [callback, setCallback],
      cate: [cate, setCate],
      page: [page, setPage],
      search: [search, setSearch],
      sort: [sort, setSort],
    },
    cateAPI: {
      cates: [cates],
    }
  } = useGlobalContext();

  const handleCategory = e => {
    setCate(e.target.value);
    setPage(1);
    setCallback(!callback);
    setSearch('');
  };

  const handleSearch = e => {
    setSearch(e.target.value.toLowerCase());
    setPage(1);
    setCallback(!callback);
  };
  const handleSort = value => {
    setSort(value);
    setPage(1);
    setMessy(false);
    setCallback(!callback);
  };

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Filters: </span>
        <select name="cate" value={cate} onChange={handleCategory}>
          <option value="">All Products</option>
          {
            cates.map((item, idx) => (
              <option value={`category=${item._id}`} key={idx}>
                {item.name}
              </option>
            ))
          }
        </select>
      </div>
      <input type="text"
        value={search}
        placeholder="Enter you search!"
        onChange={handleSearch}
      />
      <div className="row">
        <span>Sort: </span>
        <select name="sort" value={sort} onChange={e => handleSort(e.target.value)}>
          <option value="-createdAt">Newest</option>
          <option value="createdAt">Oldest</option>
          <option value="-sold">Best Sales</option>
          <option value="price">Price: Hight-Low</option>
          <option value="-price ">Price: Low-Hight</option>
          <option value="title">Name</option>
        </select>
      </div>
    </div>
  )
}

export default Filters;
