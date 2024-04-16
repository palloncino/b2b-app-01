// hooks/usePreventive.js
import { useCallback, useEffect, useState } from "react";
import { request } from "../utils/request"; // Adjust the import path as necessary

export const usePreventives = () => {
  const [preventives, setPreventives] = useState([]);
  const [loadingPreventives, setLoadingPreventives] = useState(false);
  const [preventivesError, setPreventivesError] = useState(null);

  const getPreventives = useCallback(async () => {
    setLoadingPreventives(true);
    try {
      const data = await request({
        url: `${process.env.REACT_APP_API_URL}/get-preventives`,
      });
      setPreventives(data);
      setPreventivesError(null);
    } catch (err) {
      setPreventivesError(err);
    } finally {
      setLoadingPreventives(false);
    }
  }, []);

  // Initial fetch of preventives
  useEffect(() => {
    getPreventives();
  }, [getPreventives]);

  return {
    preventives,
    loadingPreventives,
    preventivesError,
    getPreventives,
    // addPreventive,
    // editPreventive,
  };
};
