import React from 'react';
import { useGlobalContext } from '../../../GlobalState';

const LoadMore = () => {
  const {
    prodAPI: {
      callback: [callback, setCallback],
      page: [page, setPage],
      limit: [limit],
      total: [total],
    }
  } = useGlobalContext();
  const [totalPage, setTotalPage] = React.useState(0);

  React.useEffect(() => {
    setTotalPage(Math.ceil(total / limit));
  }, [total, limit]);
  React.useEffect(() => window.scroll(0, 0), [page]);

  const handleInc = () => {
    if (page < totalPage) {
      setPage(page + 1);
      setCallback(!callback);
    }
  };
  const handleDec = () => {
    if (page > 1) {
      setPage(page - 1);
      setCallback(!callback);
    }
  };

  return (
    <div className="load_more">
      <button type="button" onClick={handleDec}>{'<<'}</button>
      <button>{page}</button>
      <button type="button" onClick={handleInc}>{'>>'}</button>
    </div>
  )
};

export default LoadMore;
