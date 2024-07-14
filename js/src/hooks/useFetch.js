import { useEffect, useState } from 'react';

const API_SERVER = 'https://api.fesp.shop';

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setData(null);
    setLoading(true);
    setError(null);

    try {
      if (!url.startsWith('https')) {
        url = API_SERVER + url;
      }
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`2xx 이외의 응답: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
