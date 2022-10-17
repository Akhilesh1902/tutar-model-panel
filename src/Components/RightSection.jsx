import React, { useState, useEffect } from 'react';
import { useModelStore } from '../Store/ModelStore';

const RightSection = ({ user }) => {
  // console.log('right Section');
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const { setCurentModelUrl, setCurrentModelData, pushModel, model } =
    useModelStore((state) => state);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const fetchData = async () => {
    const filterdData = await fetch(`${SERVER_URL}/model-metadata`);
    const json = await filterdData.json();
    console.log(json);
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
    await json.forEach(async (data) => {
      // console.log(data);
      if (model[data.name]) {
        return;
      }
      const result = await fetch(`${SERVER_URL}/models/${data.name}`);
      const json = await result.json();
      // console.log(json);
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
    <div className='rightSection mb-4'>
      <h2 className='font-bold text-xl mb-5'>More Library Models</h2>
      <div className='flex w-full mb-5 gap-2'>
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
        <button className='w-max'>
          <img src='/search.svg' alt='' />
        </button>
      </div>
      {user.username ? (
        <>
          {!filteredData.length ? (
            <p>No such model in our database</p>
          ) : (
            <div className='flex md:grid h-3/5 grid-cols-2 gap-2 overflow-y-scroll w-full'>
              {filteredData.length ? (
                filteredData.map((item, i) => {
                  return (
                    <img
                      key={i}
                      className='object-contain w-28 md:h-24 bg-gray-400 rounded bg-lightGray'
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
