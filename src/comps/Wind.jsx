// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

const Wind = ({daily,value}) => {
const [wind,setWind]=useState(0);
const [guest,setGuest]=useState(0);
useEffect(()=>{
  if(daily && value){
    setWind(daily.wind_speed_10m_max[value.start/24]);
    setGuest(daily.wind_gusts_10m_max[value.start/24]);
  }
},[daily,value])
  return (
    <>
            <div className='w-[50%]'>
             <p className='text-[#ffffff74] text-[12px]'><i className="fa-solid fa-wind mr-2"></i>WIND</p>
            <div className='w-full flex'>
            <div className='mr-3'>
              <p className='flex justify-center items-center w-full h-full text-4xl font-bold'>{wind}</p>
            </div>
            <div className='text-[14px] leading-4 flex flex-col justify-center'>
              <div className='text-[#ffffff74]'>KM/H</div>
              <p>Wind</p>
              </div>
            </div>
              <div className='w-full h-[1px] bg-[#ffffff74] rounded-2xl mt-3 mb-3'></div>           
            <div className='w-full flex'>
            <div className='mr-3'>
              <p className='flex justify-center items-center w-full h-full text-4xl font-bold'>{guest}</p>
            </div>
            <div className='text-[14px] leading-4 flex flex-col justify-center'>
              <p className='text-[#ffffff74]'>KM/H</p>
              <p>Gusts</p>
              </div>
            </div>
            </div>
            <div className='h-[80%] w-[30%] flex justify-center items-start text-white'>
              <img src="/Weather-app-using-react/assets/compass.png" alt="" className='w-21 h-2w-21' />
            </div>     
    </>
  )
}

Wind.propTypes = {
  daily: PropTypes.object,
  value: PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  }).isRequired,
};

export default Wind
