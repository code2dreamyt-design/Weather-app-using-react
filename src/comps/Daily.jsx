// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

const Daily = ({daily,onClickday,onClickdaystate,getWeatherIcon}) => {
  const dayName = (index) => {
    let day  = daily.time[index];
    const date = new Date(day);
    const dayNm = date.toLocaleDateString("en-US", { weekday: "short" });
    return dayNm; 
  }
const handleDaySelection = (i) => {
  const start = i * 24;
  const end = start + 24;

  onClickday(start, end, dayName(i));

  const dflt = false;
  const daybtn = true;
  const hourbtn = false;
  onClickdaystate(dflt, daybtn, hourbtn, i);

  console.log(start, end, i);
};


  return (
 
    <>
       <div className='flex justify-around items-center h-[100%]  md:h-[70%] overflow-x-scroll'>

      {daily ? daily.precipitation_probability_max.map((prob,index)=>{
        //console.log(prob,index)
        return(
          <div className='h-full w-[25%] md:w-[17%] flex-shrink-0 flex flex-col justify-bet items-center cursor-pointer p-3 md:p-2' key={index} >
           <p className='text-[12px] pt-1'>{index===0 ? 'Today':dayName(index)}</p>
            <div className='w-full h-[80%] flex flex-col justify-around items-center' onClick={()=>{handleDaySelection(index);
            }}>
              <p className='font-bold text-xl p-3'>
           {prob}%
            </p>
            <p>
              <img src={daily?getWeatherIcon(daily.weathercode[index],1):'loading..'} alt="n" className='w-7 h-7' />
            </p>
            </div>
            </div>
        )
      }) : 'loading...'}
           </div>
    </>
  )
}

Daily.propTypes = {
  daily: PropTypes.shape({
    precipitation_probability_max: PropTypes.arrayOf(PropTypes.number),
    time: PropTypes.arrayOf(PropTypes.string),
    weathercode: PropTypes.arrayOf(PropTypes.number)
  }),
  onClickday: PropTypes.func.isRequired,
  onClickdaystate: PropTypes.func.isRequired,
  getWeatherIcon: PropTypes.func.isRequired,
  getIndex: PropTypes.func.isRequired,
};

export default Daily
