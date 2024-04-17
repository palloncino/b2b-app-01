import { useState, useCallback, useEffect } from "react";
import { request } from "../utils/request";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [loginIsLoading, setLoginIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [signupIsLoading, setSignupIsLoading] = useState(false);
  const [signupError, setSignupError] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        try {
          const response = await request({
            url: `${process.env.REACT_APP_API_URL}/verify-token`,
            method: "POST",
            body: { token: storedToken },
          });
          setUser(response.user); // Assuming the response will include user data if token is valid
        } catch (error) {
          console.log("Token validation failed", error);
          setUser(null);
          localStorage.removeItem("authToken");
        }
      }
    };
  
    verifyToken();
  }, []);

  const login = useCallback(async (credentials) => {
    setLoginIsLoading(true);
    setLoginError(null);
    try {
      const response = await request({
        url: `${process.env.REACT_APP_API_URL}/login`,
        method: "POST",
        body: credentials,
      });
      const data = response;
      setUser(data);
      localStorage.setItem("authToken", data.token);
      setToken(data.token);
    } catch (err) {
      setLoginError(err.message);
      setUser(null);
    } finally {
      setLoginIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (userData) => {
    setSignupIsLoading(true);
    setSignupError(null);
    try {
      const response = await request({
        url: `${process.env.REACT_APP_API_URL}/signup`,
        method: "POST",
        body: userData,
      });
      const data = response;
      if (data.token) {
        setUser(data);
        localStorage.setItem("authToken", data.token);
        setToken(data.token);
      } else {
        throw new Error("Signup completed but no token received");
      }
    } catch (err) {
      setSignupError(err.message);
      setUser(null);
    } finally {
      setSignupIsLoading(false);
    }
  }, []);

  return {
    user,
    token,
    login,
    loginIsLoading,
    loginError,
    signup,
    signupIsLoading,
    signupError,
  };
};
