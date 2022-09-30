import React, { useRef } from 'react';

const LoginModal = ({ setLoginModal, setUser }) => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const userNameRef = useRef();
  const passwordRef = useRef();

  const handleFormSubmit = async (e) => {
    console.log(userNameRef.current.value);
    console.log(passwordRef.current.value);
    e.preventDefault();
    const req = await fetch(`${SERVER_URL}/login`, {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // body: { username: 'testname', password: 'testPassword' },
      body: JSON.stringify({
        username: userNameRef.current.value,
        password: passwordRef.current.value,
      }),
    });
    const data = await req.json();
    if (data.error) {
      alert('invalid User');
    } else {
      console.log(data);
      setUser(data[0]);
      setLoginModal(false);
    }
    // setLoginModal(false)
  };
  return (
    <div className='position absolute w-screen h-screen grid place-items-center top-0 left-0 overlay'>
      <div className='w-2/6 p-4 flex flex-col items-center gap-2 bg-normal rounded'>
        <div className='flex w-full justify-between mb-4'>
          <h1>Login</h1>
          <button
            className='bg-red text-lightGray px-2 rounded'
            onClick={() => {
              setLoginModal(false);
            }}>
            close
          </button>
        </div>
        <form
          onSubmit={handleFormSubmit}
          className='flex flex-col gap-2 items-center'>
          <input
            required
            ref={userNameRef}
            type='text'
            placeholder='User Name'
            className='p-2 rounded outline-0 shadow-lg'
          />
          <input
            required
            ref={passwordRef}
            type='password'
            placeholder='Password'
            autoComplete='on'
            className='p-2 rounded outline-0 shadow-lg'
          />
          <button
            type='submit'
            className='mt-4 bg-green p-1 px-4 w-fit rounded'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
