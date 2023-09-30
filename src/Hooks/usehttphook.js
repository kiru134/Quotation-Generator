import { OneKPlus } from "@mui/icons-material";
import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        // body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        body: requestConfig.body ? requestConfig.body : null,
      });

      console.log(response.status);
      const data = await response.json();

      if (response.status === 401) {
        throw new Error(`Unauthorized access:${data.message}`);
      } else if (response.status === 403) {
        throw new Error(`Forbidden access:${data.message}`);
      } else if (response.status === 500) {
        throw new Error(`Internal Server Error:${response.status}`);
      } else if (response.status === 400) {
        throw new Error(`Bad Request :${data.message}`);
      } else {
        applyData(data);
      }
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};
export default useHttp;
