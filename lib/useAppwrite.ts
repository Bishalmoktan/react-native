import { useEffect, useState } from "react";

export const useAppwrite = (fn: () => Promise<any>) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const result = await fn();
      setData(result);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [fn]);

  const refetch = async () => await fetchVideos();

  return { data, loading, refetch };
};
