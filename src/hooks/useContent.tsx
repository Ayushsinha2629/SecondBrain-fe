import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { API_BASE_URL } from "../config";

export function useContent() {
  const [contents, setContents] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchContents = useCallback(() => {
    axios
      .get(`${API_BASE_URL}/api/v1/content/get`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        setContents(response.data.content);
      })
      .catch((error) => {
        console.error("Failed to fetch content:", error);
      });
  }, []);

  useEffect(() => {
    fetchContents();
  }, [refreshKey, fetchContents]);

  const refreshContents = () => setRefreshKey((prev) => prev + 1);

  return { contents, refreshContents };
}