const API_SERVER = 'https://api.fesp.shop';

const useMutation = (url, options = {}) => {
  const send = async (addOptions = {}) => {
    if (!url.startsWith('http')) {
      url = API_SERVER + url;
    }

    options = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
      ...addOptions,
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return { status: response.status, result };
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  return { send };
};

export default useMutation;
