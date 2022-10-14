import React from 'react';
import Buttons from '../Layout/Buttons';

const UserDetails = ({ user, setUser }) => {
  // console.log(user);
  const handleApprove = (e) => {
    const newReqModels = user.requestedModels.filter(
      (item) => item !== e.target.innerText.toLowerCase()
    );
    console.log({ newReqModels });
    setUser({
      ...user,
      requestedModels: newReqModels,
      approvedModels: [
        ...user.approvedModels,
        e.target.innerText.toLowerCase(),
      ],
    });
  };
  const handleDisApprove = (e) => {
    const newApprovedModels = user.approvedModels.filter(
      (item) => item !== e.target.innerText.toLowerCase()
    );
    console.log({ newApprovedModels });
    setUser({
      ...user,
      approvedModels: newApprovedModels,
      requestedModels: [
        ...user.requestedModels,
        e.target.innerText.toLowerCase(),
      ],
    });
  };
  return (
    <div className='flex flex-col gap-2'>
      <h2 className='capitalize'>user name : {user?.username}</h2>
      <div className='flex flex-col'>
        <p>Requested Models :</p>
        <div className='flex gap-3  p-2 items-center overflow-x-scroll'>
          {user?.requestedModels?.map((item, i) => {
            return (
              <div key={item._id}>
                <Buttons
                  value={item}
                  bgColor='darkGray'
                  clickHandler={handleApprove}></Buttons>
              </div>
            );
          })}
        </div>
      </div>
      <div className='flex flex-col'>
        <p>Approved Models :</p>
        <div className='flex gap-3 p-2 items-center overflow-x-scroll'>
          {user?.approvedModels?.map((item) => {
            return (
              <div>
                <Buttons
                  value={item}
                  bgColor='darkGray'
                  clickHandler={handleDisApprove}></Buttons>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
