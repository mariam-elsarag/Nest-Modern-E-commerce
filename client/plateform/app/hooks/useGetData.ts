import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { handleError } from "~/common/utils/handleError";
import axiosInstance from "~/services/axiosInstance";

type UseGetDataProps = {
  endpoint: string;

  queryDefault?: object;
};
function useGetData<T>({ endpoint, queryDefault = {} }: UseGetDataProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState();
  const [query, setQuery] = useState(queryDefault);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(endpoint, {
        params: { ...query },
      });
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
  }, [endpoint, query]);

  return { data, loading, error, fetchData, query, setQuery };
}

export default useGetData;
