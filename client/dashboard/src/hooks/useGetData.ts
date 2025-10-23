import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "../services/axiosInstance";
import { handleError } from "../common/utils/handleError";

function useGetData<T>(
  endpoint: string,
  setValue?: React.Dispatch<React.SetStateAction<any>>
) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(endpoint);
      setData(response.data);
      if (setValue) {
        Object.entries(response.data).forEach(([key, value]) => {
          setValue(key, value);
        });
      }
    } catch (err) {
      // handleError(err, t);
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

  return { data, setData, loading, error, fetchData };
}

export default useGetData;
