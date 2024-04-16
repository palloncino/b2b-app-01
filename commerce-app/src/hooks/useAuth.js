import { useState, useCallback } from "react";
import { request } from "../utils/request"; // Ensure this path is correctly set

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loginIsLoading, setLoginIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [signupIsLoading, setSignupIsLoading] = useState(false);
  const [signupError, setSignupError] = useState(null);

  const handleResponse = async (response) => {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Network response was not ok");
    }
    return response.json();
  };

  const login = useCallback(async (credentials) => {
    setLoginIsLoading(true);
    setLoginError(null); // Clear previous errors on new login attempt
    try {
      const response = await request({
        url: `${process.env.REACT_APP_API_URL}/login`,
        method: "POST",
        body: credentials,
      });
      const data = await handleResponse(response);
      setUser(data);
      localStorage.setItem("authToken", data.token);
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoginIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (userData) => {
    setSignupIsLoading(true);
    setSignupError(null); // Clear previous errors on new signup attempt
    try {
      const response = await request({
        url: `${process.env.REACT_APP_API_URL}/signup`,
        method: "POST",
        body: userData,
      });
      const data = await handleResponse(response);
      setUser(data);
      localStorage.setItem("authToken", data.token);
    } catch (err) {
      setSignupError(err.message);
    } finally {
      setSignupIsLoading(false);
    }
  }, []);

  return {
    user,
    login,
    loginIsLoading,
    loginError,
    signup,
    signupIsLoading,
    signupError,
  };
};
