import { useState, useEffect, useCallback } from 'react';

const KEY = 'username';

export function useUsername() {
  const [username, setUsernameState] = useState(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(KEY);
  });

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === KEY) setUsernameState(e.newValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const setUsername = useCallback((name) => {
    localStorage.setItem(KEY, name);
    setUsernameState(name);
  }, []);

  const clearUsername = useCallback(() => {
    localStorage.removeItem(KEY);
    setUsernameState(null);
  }, []);

  return { username, setUsername, clearUsername };
}