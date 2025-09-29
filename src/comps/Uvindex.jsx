// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

const Uvindex = ({uvIndex,value}) => {
    const [uv,setUv] = useState(0);
    useEffect(()=>{
      if(uvIndex&&value){
        // console.log(uvIndex.uv_index_max[start/24]);
         setUv((uvIndex.uv_index_max[value.start/24]));
      }
     
      //const uvindex = uvIndex.
    },[value,uvIndex]);
    useEffect(()=>{
      //console.log(uv)
    },[uv])
    const markerPositions = ()=>{
        return (uv/11)*100;//calculating the % value of uc index
        }  
  return (
    <>
     <div>
       <p className='text-[#ffffff74] text-[12px]'>
            <i className="fa-solid fa-temperature-three-quarters mr-2"></i>
                 UV INDEX
                  </p>
              </div>{/*title ended */}


            <p className='font-bold text-2xl'>{uv}</p>
            <div>

             <p>
              Modrate
             </p> 

        <div style={{
            background:'linear-gradient(to right, #00C853, #FFEB3B, #FF9800, #F44336, #9C27B0)',
            position:'relative',
            }} className='w-full h-[8px] bar rounded-2xl mt-3 mb-3 flex justify-between'>
              <div style={{
                position:'absolute',
                width:'4px',
                height:'10px',
                borderRadius:'50%',
                background:'white',
                top:'-1px',
                left:`calc(${markerPositions()}% - 2px)`
              }}></div>
                </div>
              
        <p className='text-[12px]'>use sun protection glasses</p>
     </div>
    </>
  )
}
Uvindex.propTypes = {
  uvIndex: PropTypes.number,
  value: PropTypes.any
};

export default Uvindex
