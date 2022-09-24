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
    <div className='rightSection w-2/6'>
      <h2 className='font-bold text-xl mb-5'>More Library Models</h2>
      <div className='grid h-3/5 grid-cols-2 gap-2 overflow-y-scroll w-fit'>
        {data.map((item, i) => {
          return (
            <div
              key={i}
              className={`image_container w-24 h-32 grid place-items-center bg-gray-400 rounded`}>
              <img
                className='object-contain'
                src={`data:image/jpeg;base64,${item.thumb}`}
                alt={item.name}
                onClick={handleThumbClick}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RightSection;
