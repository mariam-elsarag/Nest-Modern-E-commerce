import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { handleError } from "~/common/utils/handleError";
import axiosInstance from "~/services/axiosInstance";

function useGetData<T>(endpoint: string) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(endpoint);
      setData(response.data);
    } catch (err) {
      handleError(err, t);
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (endpoint) {
      fetchData();
    }
  }, [endpoint]);

  return { data, loading, error, fetchData };
}

export default useGetData;
