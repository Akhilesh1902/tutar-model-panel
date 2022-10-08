import { useState } from 'react';

const useLogin = (key, initialValue) => {
  const [loginDetails, setLoginDetails] = useState(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setLoginDetails(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return [loginDetails, setValue];
};

export default useLogin;
