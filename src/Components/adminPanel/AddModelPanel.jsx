import React, { useRef, useState } from 'react';
import FlexCol from '../Layout/FlexCol';
import FlexRow from '../Layout/FlexRow';
import Section from '../Layout/Section';
import CanvasWrapper from '../../ThreeJS/CanvasWrapper';
import InputDiv from '../InputDiv';
import { AllClasses, AllSubjects } from './constants';
import Buttons from '../Layout/Buttons';
import { useModelStore } from '../../Store/ModelStore';
import { io } from 'socket.io-client';

const AddModelPanel = () => {
  const thumbRef = useRef();
  const formRef = useRef();
  const setCurentModelUrl = useModelStore((state) => state.setCurentModelUrl);
  const setCurrentModelData = useModelStore(
    (state) => state.setCurrentModelData
  );
  const [modelData, setModelData] = useState({
    thumbName: '',
    thumb: null,
    file: null,
    name: '',
  });

  const socket = io(process.env.REACT_APP_SERVER_URL);

  const handleForomSubmit = async (e) => {
    e.preventDefault();
    const formData = formRef.current.elements;
    console.log(formData);
    console.log(formData.Classes.value);
    console.log(formData);
    console.log(modelData);
    const { Classes, DisplayName, Scale, Subjects, Topic } = formData;

    const fd = new FormData();
    console.log(fd);

    const dataToSend = {
      ...modelData,
      Class: Classes.value,
      DisplayName: DisplayName.value,
      Scale: Scale.value,
      Subject: Subjects.value,
      Topic: Topic.value,
    };

    console.log({ dataToSend });
    socket.emit('newFile', dataToSend);
  };

  const handleThumbChange = (e) => {
    console.log('handleing thubChange');
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    thumbRef.current.style.backgroundImage = `url(${url})`;
    const thumbName = file.name.replace(/ /g, '_');
    setModelData((pd) => ({ ...pd, thumbName, thumb: file }));
  };
  const handleModelChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setCurentModelUrl(url);
    setModelData((pd) => ({ ...pd, name: file.name.replace(/ /g, '_'), file }));
  };

  return (
    <div className='w-full h-full'>
      <h1 className='text-xl font-bold'>Add New Model</h1>
      <form
        className='flex flex-col items-center'
        onSubmit={handleForomSubmit}
        ref={formRef}>
        <FlexRow className={'justify-between'}>
          <Section>
            <FlexCol>
              <FlexRow>
                <InputDiv
                  type={'file'}
                  label='thumbnail'
                  handleChange={handleThumbChange}
                />
                <div
                  ref={thumbRef}
                  className='bg-accent w-20 aspect-square !bg-cover !bg-top'></div>
              </FlexRow>
              <InputDiv
                type={'file'}
                label='model'
                handleChange={handleModelChange}
              />
              <FlexCol className={'self-start !items-start gap-0 mt-2'}>
                <h2>Preview : </h2>
                <div className='self-start mt-5 bg-darkGray'>
                  <CanvasWrapper></CanvasWrapper>
                </div>
              </FlexCol>
            </FlexCol>
          </Section>
          <Section>
            <FlexCol className={'!items-start'}>
              <h1 className='text-lg underline'>Model Data :</h1>
              <InputDiv label={'DisplayName'} />
              <OptionsContainer arr={AllClasses} label={'Classes'} />
              <OptionsContainer arr={AllSubjects} label={'Subjects'} />
              <InputDiv label={'Topic'} />
              <InputDiv
                label={'Scale'}
                type={'number'}
                // displayValue={modelData.scale}
                handleChange={(e) => {
                  setCurrentModelData({ scale: e.target.value });
                }}
              />
            </FlexCol>
          </Section>
        </FlexRow>
        <Buttons value='Submit' bgColor={'green'} className={'mt-6'} />
      </form>
    </div>
  );
};

export default AddModelPanel;

const OptionsContainer = ({ label, arr }) => {
  return (
    <FlexCol className={'!items-start gap-0'}>
      <label htmlFor={label}>{label} :</label>
      <select name={label} className='self-start p-2 outline-none'>
        {arr.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </FlexCol>
  );
};
