import { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}${url}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let responseData = await response.json();
        setData(responseData);
        setError(null);
      } catch (error) {
        if (error instanceof Error) {
          setError(`useFetch error: ${error.message}`);
        } else {
          setError("useFetch error: Unknown error");
        }
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, options]);

  return { data, loading, error };
}

export default useFetch;
