import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LibraryPanel from '../Components/LibraryPanel';
import AddUserPage from './AddUserPage';

const index = () => {
  return (
    <Routes>
      <Route path='/' element={<LibraryPanel />} />
      <Route path='/adduser' element={<AddUserPage />} />
    </Routes>
  );
};

export default index;
