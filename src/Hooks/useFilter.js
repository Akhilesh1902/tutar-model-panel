import { useState } from 'react';

const useFilter = (initialObj) => {
  const [filterObj, setFilterObj] = useState(initialObj);

  // console.log(AllClasses, AllSubjects);

  console.log({ filterObj });
  const updateFilterObj = (obj = initialObj) => {
    setFilterObj(obj);
  };

  return [filterObj, updateFilterObj];
};

export default useFilter;
