/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import Hourly from './Hourly'
import Daily from './Daily'
import Uvindex from './Uvindex'
import Wind from './Wind'

const OtherWeather = ({ DailyWeather, hourlyForecast, uvIndex, getIndex, hourlydata, value, stateVals,getWeatherIcon}) => {
  return (
    <>
      <div className="h-full w-full md:w-full lg:w-[60%] p-5 flex flex-col">
        
        {/* Hourly Forecast */}
        <div className="h-[40%] md:h-[33%] w-full rounded-2xl pl-2 pt-2 bg-[#0000009d]  mt-4">
          <p className="text-[#ffffff74] pl-2 pb-2 text-sm md:text-base">
            <i className="fa-regular fa-clock mr-2"></i>
            <span>Hourly Forecast</span>
          </p>
          <div className="w-full h-[1px] bg-[#ffffff39]"></div>
          <Hourly
            hourlyForecast={hourlyForecast}
            hvalue={value}
            onClickday={hourlydata}
            onClickhour={stateVals}
            getWeatherIcon={getWeatherIcon}
          />
        </div>

        {/* Daily Forecast */}
        <div className="h-auto md:h-[33%] w-full rounded-2xl p-2 bg-[#0000009d] mb-6 mt-6">
          <p className="text-[#ffffff74] pl-2 pb-2 text-sm md:text-base">
            <i className="fa-regular fa-calendar mr-2"></i>
            <span>7-Day Forecast</span>
          </p>
          <div className="w-full h-[1px] bg-[#ffffff39]"></div>
          <Daily
            daily={DailyWeather}
            onClickday={hourlydata}
            getIndex={getIndex}
            onClickdaystate={stateVals}
            getWeatherIcon={getWeatherIcon}
          />
        </div>

        {/* UV & Wind Section */}
        <div className="h-auto md:h-[30%] w-full flex flex-col md:flex-row justify-between items-stretch gap-4 mt-4">
          <div className="h-auto md:h-[90%] w-full md:w-[48%] bg-[#0000009d] rounded-2xl p-3 flex flex-col justify-between">
            <Uvindex uvIndex={uvIndex} value={value} />
          </div>
          <div className="h-auto md:h-[90%] w-full md:w-[48%] rounded-2xl bg-[#0000009d] p-3 flex justify-between">
            <Wind daily={DailyWeather} value={value} />
          </div>
        </div>
      </div>
    </>
  )
}

export default OtherWeather
