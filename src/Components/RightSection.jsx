import React, { useState, useEffect } from 'react';
import { useModelStore } from '../Store/ModelStore';

const RightSection = () => {
  console.log('right Section');

  const { setCurentModelUrl, setCurrentModelData, pushModel, model } =
    useModelStore((state) => state);

  const [data, setData] = useState([]);
  const fetchData = async () => {
    const filterdData = await fetch('https://tutar-webapp.herokuapp.com/first');
    const json = await filterdData.json();
    setData(json);
    fetchAllTheModels(json);
  };

  const fetchAllTheModels = async (json) => {
    // return;
    await json.forEach(async (data) => {
      if (model[`models_${data.fileAddr.split('/')[1]}`]) {
        return;
      }
      const result = await fetch(
        `https://tutar-webapp.herokuapp.com/${data.fileAddr}/embed`
      );
      const json = await result.json();

      pushModel({
        name: json.modelName.replace('/', '_'),
        blob: json.model.data,
      });
    });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleThumbClick = (e) => {
    console.log('clicking');
    const name = e.target.alt || e.target.dataset.name;
    const m = data.find((item) => item.name === name);
    if (!model[`models_${m.name}`]) {
      alert('wait till all models are loaded');
      return;
    }
    setCurrentModelData(m);
    const arrBuff = new Uint8Array(model[`models_${m.name}`].blob);
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
    </div>
  );
};

export default RightSection;
