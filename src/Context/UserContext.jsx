import React from "react";
import { useState, useEffect, createContext } from "react";
export const UserContext = createContext({});
export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [sessionId, setSessionId] = useState(getLocaleStorageSessionId);

  function getLocaleStorageSessionId() {
    return localStorage.getItem("session_id");
  }
  useEffect(() => {
    if (sessionId) {
      localStorage.setItem("session_id", sessionId);
      fetch(
        `https://api.themoviedb.org/3/account?api_key=86ba05b5b5ef9e6cd98405fff0572996&session_id=${sessionId}`
      )
        .then((r) => r.json())
        .then((data) => {
          setUser(data);
        });
    }
  }, [sessionId]);

  return (
    <UserContext.Provider value={{ user, setUser, setSessionId }}>
      {children}
    </UserContext.Provider>
  );
}
