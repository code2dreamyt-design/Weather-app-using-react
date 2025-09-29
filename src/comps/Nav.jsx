// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types';

const Nav = ({ getSearchedData, locationData, getLatLon}) => {
  const [display, setDisplay] = useState('hidden');
  const [search, setSearch] = useState('');

  // Removed unused getLocation function
  return (
    <>
      <div className='sticky top-0 h-12 w-full flex justify-around items-center md:mb-3 z-50'>
        <div className='w-full flex justify-between md:justify-around items-center bg-[#000000] h-full rounded-[10px] p-2'>
          
          {/* Logo */}
          <div className=' w-[10%] md:w-[20%]  h-full flex  items-center p-1 ml-1'>
            <img src='/Weather-app-using-react/assets/logos/img1.png' alt="" className='rounded-[50%] md:hidden w-9'/> 
            <img src={'/Weather-app-using-react/assets/logos/biglogo.svg'} alt="" className='hidden h-[auto] max-w-40 md:block'/>
          </div>

          {/* Search bar */}
        <div className='h-full w-[50%] md:w-[40%] lg:w-[50%] lg:mr-1.5 flex items-center relative'>
               <div className='w-full flex justify-around items-center border-1 rounded-2xl p-1 h-[80%] md:h-[95%]'>
            <input
              type="text"
              className='border-r-none w-[85%] h-full pl-4 outline-none text-[12px]'
              value={search}
              id='geo'
              onChange={(e) => {
                setSearch(e.target.value);
                getSearchedData(e.target.value);
                setDisplay('');
              }}
            />
            <i
              className="fa-solid fa-magnifying-glass h-[90%] pt-0.5 m-auto flex justify-center items-center cursor-pointer text-[12px] md:text-[16px] md:mr-1.5"
              onClick={() => {
                getSearchedData(search);
                setDisplay('');
                console.log(search);
              }}
            ></i>
          </div>

          {/* Search suggestions */}
          <div className={`w-full ${display} absolute top-9 rounded-2xl text-black p-2`}>
            {
              locationData
                ? locationData
                    .filter(data => data.class === 'boundary' || data.class === 'place')
                    .map((data, i) =>
                      <p
                        key={i}
                        className='w-full p-1 mb-0.5 bg-[#ffffff98] font-bold hover:text-[#430a0a] hover:text-[1.1rem] cursor-pointer'
                        onClick={() => {
                          getLatLon({ lat: data.lat, lon: data.lon,Name:data.display_name });
                          setSearch('');
                          setDisplay('hidden');
                        }}
                      >
                        {data.class === 'boundary' || data.class === 'place' ? data.display_name : ''}
                      </p>
                    )
                : ''
            }
          </div>
        </div>

              <div className='flex w-[35%] justify-between p-1 md:p-3'>
                
                  <div className='flex'>
                          Rohru
                      </div>


                           <div><i className="fa-solid fa-circle-info mr-1.5"></i>
                        <span className='hidden md:inline'>About</span>
                      </div>
            

          <div>
          <i className="fa-solid fa-arrow-right-to-bracket mr-1.5"></i>
          <span className='hidden md:inline '>Sign Up</span>
          </div>
              </div>
        </div>
      </div>
    </>
  )
}

Nav.propTypes = {
  getSearchedData: PropTypes.func.isRequired,
  locationData: PropTypes.array,
  getLatLon: PropTypes.func.isRequired,
};

export default Nav
