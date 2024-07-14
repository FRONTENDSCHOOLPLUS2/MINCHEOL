import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@components/Button';
import PostList from '../components/PostList';

// const TYPE = 'goodmorning';
const TYPE = 'post';
const LIMIT = 8;

export default function Info() {
  const [data, setData] = useState();
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paramsStr = params.toString();

  const handleSearch = async (e) => {
    e.preventDefault();
    navigate(`/info?keyword=${keyword}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchURL =
        `https://api.fesp.shop/posts?type=${TYPE}&limit=${LIMIT}` +
        (paramsStr ? '&' + paramsStr : '');
      try {
        const response = await fetch(fetchURL);
        const result = await response.json();
        setData(result);
      } catch (err) {
        // TODO: error 처리
        console.error(err);
      }
    };

    fetchData();
  }, [paramsStr]);

  return (
    <main className="min-w-80 p-10">
      <div className="text-center py-4">
        <h2 className="pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">
          정보 공유
        </h2>
      </div>
      <div className="flex justify-end mr-4">
        {/* 검색 */}
        <form onSubmit={handleSearch}>
          <input
            className="dark:bg-gray-600 bg-gray-100 p-1 rounded"
            type="text"
            name="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button type="submit">검색</Button>
        </form>

        <Button handleClick={() => navigate('/info/new')}>글작성</Button>
      </div>
      {data && <PostList data={data} />}
    </main>
  );
}
