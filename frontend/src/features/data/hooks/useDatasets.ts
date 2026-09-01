import useSWR from "swr";
import { Dataset } from "../types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useDatasets() {
  const { data, error, isLoading, mutate } = useSWR<{ datasets: Dataset[] }>("/api/datasets", fetcher);

  return {
    datasets: data?.datasets || [],
    isLoading,
    isError: !!error,
    refresh: mutate,
  };
}
