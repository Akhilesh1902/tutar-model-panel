import React from 'react';
import Buttons from './Layout/Buttons';

const UserDetails = ({ user, setUser }) => {
  console.log(user);

  //   const [user, setUser] = useState(User);

  const handleApprove = (e) => {
    console.log(e.target.innerText);
    // const i = user.requestedModels.indexOf(e.target.innerText);
    console.log(user);
    const newReqUser = user.requestedModels.map(
      (item) => item !== e.target.innerText
    );
    setUser((p) => ({
      ...p,
      approvedModels: [...p.approvedModels, e.target.innerText],
      requestedModels: newReqUser,
    }));
    // user.approvedModels.push(e.target.innerText);
    // user.requestedModels.splice(i, 1);
  };

  return (
    <div className='flex flex-col gap-2'>
      <h2 className='capitalize'>user name : {user?.username}</h2>
      <div className='flex flex-col'>
        <p>Requested Models :</p>
        <div className='flex gap-3 h-16 items-center overflow-x-scroll'>
          {user?.requestedModels?.map((item, i) => {
            return (
              <div>
                <Buttons
                  value={item}
                  bgColor='darkGray'
                  key={i}
                  valueColor={'red'}
                  clickHandler={handleApprove}></Buttons>
              </div>
            );
          })}
        </div>
      </div>
      <div className='flex flex-col'>
        <p>Approved Models :</p>
        <div className='flex gap-3 h-16 items-center overflow-x-scroll'>
          {user?.approvedModels?.map((item) => {
            return (
              <div>
                <Buttons value={item} bgColor='darkGray'></Buttons>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
