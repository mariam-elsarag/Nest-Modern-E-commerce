import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

type UsePaginatedDataProps = {
  endpoint: string;
  type?: "pages" | "scroll";
  queryDefault?: object | null;
};
function usePaginatedData<T = { id: number }>({
  endpoint,
  type = "pages",
  queryDefault = null,
}: UsePaginatedDataProps) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const [error, setError] = useState<Error | unknown>();
  const [loading, setLoading] = useState(false);
  const [searchLoader, setSearchLoader] = useState(false);
  const [query, setQuery] = useState(queryDefault);
  const [refetchData, setRefetchData] = useState();
  const [hasMore, setHasMore] = useState<boolean>(false);

  const fetchData = async (currentPage: number = 1) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(endpoint, {
        params: { page: currentPage, ...query },
      });
      const currentData = response.data;
      setPages(currentData?.pages);
      setPage(currentData?.page);
      if (currentPage < currentData?.pages || currentData.next) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }

      const results = currentData?.results || [];
      // if (results.length > 0) {
      //   if (Array.isArray(results)) {
      //     if (type === "pages") {
      //       setData(results);
      //     } else {
      //       setData((prevData) => {
      //         const allData =
      //           currentPage === 1 ? [...results] : [...prevData, ...results];
      //         const uniqueData = allData.reduce<T[]>((acc, item) => {
      //           if (!acc.some((existing) => existing.id === item.id)) {
      //             acc.push(item);
      //           }
      //           return acc;
      //         }, []);
      //         return uniqueData;
      //       });
      //     }
      //   }
      // } else {
      //   setData(currentData);
      // }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      if (searchLoader) {
        setSearchLoader(false);
      }
    }
  };

  const handlePagination = (pageNumber: number): void => {
    fetchData(pageNumber);
  };
  const handleScroll = (): void => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const innerHeight = window.innerHeight;

    if (innerHeight + scrollTop + 1 >= scrollHeight && !loading && hasMore) {
      const nextPage = page + 1;
      fetchData(nextPage);
      setPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    fetchData();
    setPage(1);
  }, [endpoint]);

  useEffect(() => {
    if (query || refetchData) {
      fetchData();
      setPage(1);
    }
  }, [query, refetchData]);

  return {
    page,
    pages,
    data,
    setData,
    hasMore,
    loading,
    error,
    fetchData,
    setRefetchData,
    query,
    setQuery,
    handlePagination,
    handleScroll,
    searchLoader,
    setSearchLoader,
  };
}
export default usePaginatedData;
