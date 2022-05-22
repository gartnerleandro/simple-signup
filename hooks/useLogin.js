import { useState, useEffect } from "react";

import { getSessionValue, setSessionValue } from "../utils/cookies";

export default function useLogin() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const userData = getSessionValue("user");

    if (userData) {
      setUser(userData);
    } else {
      setUser(null);
    }
  }, []);

  function login(userData) {
    const cleanUserData = { ...userData };

    if (cleanUserData) {
      delete cleanUserData.password;
      setSessionValue("user", cleanUserData);
      setUser(cleanUserData);
    }
  }

  function logout() {
    setSessionValue("user", null);
    setUser(null);
  }

  return { user, login, logout };
}
