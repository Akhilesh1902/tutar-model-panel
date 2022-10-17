import { useState } from 'react';

const useLogin = (key, initialValue) => {
  const fetchUser = async (username, password) => {
    console.log('fetching user');
    const req = await fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await req.json();
    if (data.error) {
      alert('invalid User');
      return;
    } else {
      setValue({ username, password });
      return data;
    }
  };
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
    console.log(value);
    try {
      setLoginDetails(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return [loginDetails, setValue, fetchUser];
};

export default useLogin;
