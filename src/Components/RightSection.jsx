import React, { useState, useEffect } from 'react';
import { useModelStore } from '../Store/ModelStore';
import { FiFilter, FiSearch } from 'react-icons/fi';
import Buttons from './Layout/Buttons';
import Section from './Layout/Section';
import FilterMenu from './FilterMenu';
import useFilter from '../Hooks/useFilter';
import { AllClasses, AllSubjects } from './adminPanel/constants';

const RightSection = ({ user }) => {
  // console.log('right Section');
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const { setCurentModelUrl, setCurrentModelData, pushModel, model } =
    useModelStore((state) => state);
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const initialFilterObj = { class: AllClasses, subject: AllSubjects };
  const [filterObj, updateFilterObj] = useFilter(initialFilterObj);

  // const filterCriteria = ['Class', 'Subject', 'Topic'];
  // const [filterObj, setFilterObj] = useState({});

  console.log(filterObj);

  const fetchData = async () => {
    const filterdData = await fetch(`${SERVER_URL}/model-metadata`);
    const json = await filterdData.json();
    console.log(json);
    console.log(Object.keys(json[0]));
    setData(
      json.map((item) => {
        return {
          ...item,
          DisplayName: item.DisplayName ? item.DisplayName.toLowerCase() : '',
        };
      })
    );

    setFilteredData(
      json.map((item) => {
        return {
          ...item,
          DisplayName: item.DisplayName ? item.DisplayName.toLowerCase() : '',
        };
      })
    );
    fetchAllTheModels(json);
  };

  const fetchAllTheModels = async (json) => {
    console.log(json);
    // return;
    await json.forEach(async (data) => {
      // console.log(data);
      if (model[data.name]) {
        return;
      }
      const result = await fetch(`${SERVER_URL}/models/${data.name}`);
      const json = await result.json();
      console.log(json);
      pushModel({
        name: json.modelName,
        blob: json.model.data,
      });
    });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleThumbClick = (e) => {
    const name = e.target.alt || e.target.dataset.name;
    const m = data.find((item) => item.name === name);
    setCurrentModelData(m);
    if (!model[m.name]) {
      alert('wait till all models are loaded');
      return;
    }
    const arrBuff = new Uint8Array(model[m.name].blob);
    const blob = new Blob([arrBuff]);

    if (!blob) {
      alert('wait till all models are loaded');
      return;
    }
    const url = URL.createObjectURL(blob);
    setCurentModelUrl(url);
  };
  return (
    <div className='rightSection md:mb-4'>
      <h2 className='font-bold text-xl mb-1 md:mb-5'>More Library Models</h2>
      <div className='flex w-full mb-3 md:mb-5 gap-2'>
        <input
          type='text'
          onChange={(e) => {
            setFilteredData(
              data.filter((elem) => {
                // console.log(elem);
                return elem.DisplayName?.includes(e.target.value);
              })
            );
          }}
          placeholder='Search'
          className='rounded p-1 outline-none w-4/5 bg-darkGray text-white placeholder:text-white'
        />
        <Buttons className='w-max'>
          <FiSearch />
        </Buttons>
        <Buttons
          clickHandler={() => {
            setOpenFilterMenu((ps) => !ps);
          }}>
          <FiFilter />
        </Buttons>
        <Section
          className={
            'absolute justify-center bg-white w-4/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
          }>
          {/* <h1>Filter Section</h1> */}
          {openFilterMenu && (
            <FilterMenu
              filterObj={filterObj}
              updateFilterObj={updateFilterObj}
              toggleFilter={() => {
                setOpenFilterMenu((ps) => !ps);
              }}
            />
          )}
        </Section>
      </div>
      {user.username ? (
        <>
          {!filteredData.length ? (
            <p>No such model in our database</p>
          ) : (
            <div className='flex md:grid mb-6 pb-2 md:pb-0 md:pr-2 grid-cols-2 gap-2 overflow-x-scroll md:overflow-auto  md:overflow-y-scroll w-full'>
              {filteredData.length ? (
                filteredData.map((item, i) => {
                  return (
                    <img
                      key={i}
                      className='object-contain w-16 md:w-28 md:h-24 bg-gray-400 rounded bg-lightGray'
                      src={`data:image/jpeg;base64,${item.thumb}`}
                      alt={item.name}
                      onClick={handleThumbClick}
                    />
                  );
                })
              ) : (
                <p>No such models in our database</p>
              )}
            </div>
          )}
        </>
      ) : (
        <div className='w-full mb-10'>
          <p className='w-full'>Login to View Model</p>
        </div>
      )}
    </div>
  );
};

export default RightSection;
