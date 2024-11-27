import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { API_BASE_URL } from "../config";

export function useAdmin() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchContents = useCallback(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`${API_BASE_URL}/api/v1/admin/content`, {
        headers: {
          Authorization: `${localStorage.getItem("token") || ""}`,
        },
      })
      .then((response) => {
        setContents(response.data.content);
      })
      .catch((error) => {
        console.error("Failed to fetch content:", error);
        setError(error.response?.data?.message || "An error occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchContents();
  }, [refreshKey, fetchContents]);

  const refreshContents = () => setRefreshKey((prev) => prev + 1);

  return { contents, loading, error, refreshContents };
}
