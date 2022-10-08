import React, { useState, useEffect } from 'react';
import { useModelStore } from '../Store/ModelStore';

const RightSection = ({ user }) => {
  // console.log('right Section');
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const { setCurentModelUrl, setCurrentModelData, pushModel, model } =
    useModelStore((state) => state);

  const [data, setData] = useState([]);
  const fetchData = async () => {
    const filterdData = await fetch(`${SERVER_URL}/model-metadata`);
    const json = await filterdData.json();
    setData(json);
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
      {user.username ? (
        <div className='flex md:grid h-3/5 grid-cols-2 gap-2 overflow-scroll w-full'>
          {data.map((item, i) => {
            return (
              <img
                key={i}
                className='object-contain w-28 md:h-24 bg-gray-400 rounded bg-lightGray'
                src={`data:image/jpeg;base64,${item.thumb}`}
                alt={item.name}
                onClick={handleThumbClick}
              />
            );
          })}
        </div>
      ) : (
        <div className='w-full mb-10'>
          <p className='w-full'>Login to View Model</p>
        </div>
      )}
    </div>
  );
};

export default RightSection;
