import React, { useState } from 'react';
import Section from './Layout/Section';
import FlexRow from './Layout/FlexRow';
import Buttons from './Layout/Buttons';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import FlexCol from './Layout/FlexCol';
import { useRef } from 'react';

const FilterMenu = ({ filterObj, toggleFilter, setFilterObject }) => {
  console.log(
    '🚀 ~ file: FilterMenu.jsx ~ line 8 ~ FilterMenu ~ filterObj',
    filterObj
  );

  const [activeFilterSelector, setActiveFilterSelector] = useState('class');

  const [filter, setFilter] = useState({ class: [], subject: [] });

  const handleFilterSelection = (e) => {
    console.log(e.target.innerText);
    setActiveFilterSelector(e.target.innerText.toLowerCase());
  };

  const classArr = useRef([]);

  const handleFilterChecked = (e) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      classArr.current.push(e.target.name);
      console.log(classArr.current);
    } else {
      const i = classArr.current.indexOf(e.target.name);
      classArr.current.splice(i, 1);
    }
    const tempObj = { ...filter };
    tempObj[activeFilterSelector] = classArr.current;
    setFilter(tempObj);
  };

  const applyFilter = () => {};

  return (
    <Section className={'!justify-start flex-col p-2'}>
      <FlexRow className={'justify-between'}>
        <h1 className='font0bold '>Filter Menu</h1>
        <Buttons
          clickHandler={() => {
            toggleFilter((ps) => !ps);
          }}>
          <AiOutlineCloseCircle color='red' />
        </Buttons>
      </FlexRow>

      <FlexRow>
        <Section flexPercent={1}>
          <FlexCol>
            {Object.keys(filterObj).map((item, i) => (
              <Buttons key={item} clickHandler={handleFilterSelection}>
                {item}
              </Buttons>
            ))}
          </FlexCol>
        </Section>
        <Section flexPercent={5} className={'border-l pl-3'}>
          <div className='miniScroll h-60 w-full  overflow-y-scroll'>
            <FlexCol>
              {filterObj[activeFilterSelector].map((item, i) => (
                <FlexRow key={item}>
                  <input
                    type={'checkbox'}
                    onChange={handleFilterChecked}
                    name={item}
                    className={'outline-none'}
                  />
                  {/* <Buttons>{item}</Buttons> */}
                  <p>{item}</p>
                </FlexRow>
              ))}
            </FlexCol>
          </div>
        </Section>
      </FlexRow>
      <Buttons className={'w-fit self-center mt-4'} clickHandler={applyFilter}>
        Apply Filter
      </Buttons>
    </Section>
  );
};

export default FilterMenu;
