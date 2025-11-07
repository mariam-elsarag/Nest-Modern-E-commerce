import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { handleError } from "~/common/utils/handleError";
import axiosInstance from "~/services/axiosInstance";

type UseGetDataProps = {
  endpoint: string;
  queryDefault?: object;
  setValue?: (data: any) => void;
};
function useGetData<T>({
  endpoint,
  queryDefault = {},
  setValue,
}: UseGetDataProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState();
  const [query, setQuery] = useState(queryDefault);
  const [refetch, setRefetch] = useState();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(endpoint, {
        params: { ...query },
      });
      setData(response.data);
      if (setValue) {
        setValue(response.data);
      }
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
  }, [endpoint, query, refetch]);

  return {
    data,
    setData,
    loading,
    error,
    fetchData,
    query,
    setQuery,
    refetch,
    setRefetch,
  };
}

export default useGetData;
