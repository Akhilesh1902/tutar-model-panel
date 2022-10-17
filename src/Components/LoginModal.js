import React, { useRef } from 'react';
const LoginModal = ({ setLoginModal, setUser, setLoginDetails, fetchUser }) => {
  const userNameRef = useRef();
  const passwordRef = useRef();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = await fetchUser(
      userNameRef.current.value,
      passwordRef.current.value
    );
    if (data.error) {
      alert('invalid User');
    } else {
      setUser(data);
      setLoginModal(false);
      setLoginDetails({ username: data.username, password: data.password });
    }
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
