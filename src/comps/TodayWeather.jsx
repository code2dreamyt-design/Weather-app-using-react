/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
  
  
const TodayWeather = ({ currentData,DailyWeather,hourlyForecast,indexVal,clickbtn,hIndex,displayLocation,getWeatherIcon}) => {

   // const [index,setIndex] = useState(0); //useState is used to get the updated time and from the api the time hour in 24 hrs format is the index for that hour and all other arrays in the hourly forcast 

  // helper: decide daily data key


const getDailyKey = (type) => {
  if (type === 'precipitation') return `${type}_sum`;
  else if (type === 'cloud_cover' || type === 'relative_humidity_2m') return `${type}_mean`;
  else{
    return `${type}_max`;
  }
 
};

// central function for data fetching
const getData = (dataType) => {
  if (clickbtn.daybtn) {
    const key = getDailyKey(dataType);
    return DailyWeather ? DailyWeather[key][Math.floor(indexVal.start / 24)] : 'loading..';
  }

  else if (clickbtn.hourbtn) {
    //console.log(hIndex)
    return hourlyForecast ? hourlyForecast[dataType][hIndex] : 'loading';
  }
  else{
     return 'loading';
  }
 
};

// central function for time display
const showDayTime = () => {
  if (clickbtn.default) {
    return 'Today, Now';
  }

  else if (clickbtn.hourbtn) {
    const hourTime = new Date(hourlyForecast.time[hIndex])
      .toLocaleTimeString([], { hour: 'numeric' });

    if (indexVal.start === 0) {
      return `Today, ${hourTime}`;
    }

    const dayLabel = new Date(DailyWeather.time[Math.floor(indexVal.start / 24)])
      .toLocaleDateString('en-us', { day: 'numeric', weekday: 'short', month: 'short' });

    return `${dayLabel} at ${hourTime}`;
  }

  return new Date(DailyWeather.time[Math.floor(indexVal.start / 24)])
    .toLocaleDateString('en-us', { weekday: 'short', day: 'numeric', month: 'short' });
};


const setIcon = ()=>{
  if(clickbtn.daybtn){
    return DailyWeather ? getWeatherIcon(DailyWeather.weathercode[Math.floor(indexVal.start/24)],1):'/Weather-app-using-react/assets/images/loading.gif';
  }else{
    return hourlyForecast? getWeatherIcon(hourlyForecast.weathercode[hIndex],hourlyForecast.is_day[hIndex]):'/Weather-app-using-react/assets/images/loading.gif'
  }
}

// 🌤️ DAILY MESSAGES — storytelling style
const getDailyMessage = (code, is_day) => {
  switch (code) {
    case 0: return is_day ? "Bright and clear skies ahead ☀️" : "Clear starry night, perfect for stargazing 🌌";
    case 1: return is_day ? "Mostly sunny with just a few clouds 🌤️" : "Mostly clear night, only a few clouds 🌙";
    case 2: return is_day ? "Partly cloudy — sun and shade mixed ⛅" : "Partly cloudy night, stars peeking through ✨";
    case 3: return is_day ? "Overcast skies, a gray day ahead ☁️" : "Cloudy night, no stars in sight 🌑";

    case 45: return is_day ? "Foggy morning, drive safe 🌫️" : "Foggy night, visibility is low 🌫️🌙";
    case 48: return is_day ? "Freezing fog with icy deposits ❄️🌫️" : "Icy fog at night, extra caution ❄️🌫️";

    case 51: return "Light drizzle — just a gentle mist 🌦️";
    case 53: return "Steady drizzle, keep an umbrella handy ☔";
    case 55: return "Heavy drizzle, a damp and chilly day 🌧️";

    case 56: return "Light freezing drizzle — slippery surfaces ❄️";
    case 57: return "Icy freezing drizzle, extra caution needed 🧊☔";

    case 61: return "Light rain showers passing through 🌦️";
    case 63: return "Moderate rain — grab your umbrella 🌧️";
    case 65: return "Heavy downpour, stay dry out there ⛈️";

    case 66: return "Light freezing rain, roads may be icy ❄️🌧️";
    case 67: return "Freezing rain with heavy ice buildup 🧊";

    case 71: return "Light snowflakes drifting down ❄️";
    case 73: return "Moderate snowfall, a wintry scene 🌨️";
    case 75: return "Heavy snowfall — winter wonderland incoming ❄️⛄";

    case 77: return "Snow grains — tiny icy flakes in the air 🌨️";

    case 80: return is_day ? "Slight rain showers, quick bursts of rain 🌦️" : "Slight nighttime showers 🌧️🌙";
    case 81: return is_day ? "On and off moderate rain showers ☔" : "Night rain showers continuing 🌧️🌙";
    case 82: return is_day ? "Intense rain showers — a soaking storm ⛈️" : "Heavy nighttime showers with storms 🌧️⚡";

    case 85: return "Light snow showers — gentle flurries ❄️";
    case 86: return "Heavy snow showers — big flakes falling fast 🌨️";

    case 95: return "Thunderstorm rumbling in ⚡⛈️";
    case 96: return "Thunderstorm with small hail ⚡🌩️";
    case 99: return "Severe thunderstorm with heavy hail 🌩️❄️";

    default: return is_day ? "Weather data unavailable, but it’s daytime 🌞" : "Weather data unavailable, but it’s nighttime 🌙";
  }
};
// 🕐 HOURLY MESSAGES — short & snappy
  const getHourlyMessage = (code, is_day) => {
  switch (code) {
    case 0: return is_day ? "Sunny ☀️" : "Clear night 🌌";
    case 1: return is_day ? "Mostly sunny 🌤️" : "Mostly clear 🌙";
    case 2: return is_day ? "Partly cloudy ⛅" : "Partly cloudy night ✨";
    case 3: return "Cloudy ☁️";

    case 45:
    case 48: return "Foggy 🌫️";

    case 51: return "Light drizzle 🌦️";
    case 53: return "Drizzle ☔";
    case 55: return "Heavy drizzle 🌧️";

    case 56:
    case 57: return "Freezing drizzle ❄️";

    case 61: return "Light rain 🌦️";
    case 63: return "Rain 🌧️";
    case 65: return "Heavy rain ⛈️";

    case 66:
    case 67: return "Freezing rain 🧊";

    case 71: return "Light snow ❄️";
    case 73: return "Snow 🌨️";
    case 75: return "Heavy snow ⛄";

    case 77: return "Snow grains 🌨️";

    case 80: return is_day ? "Showers 🌦️" : "Night showers 🌧️";
    case 81: return is_day ? "Rain bursts ☔" : "Night rain 🌙";
    case 82: return is_day ? "Storm showers ⛈️" : "Heavy night rain 🌧️⚡";

    case 85:
    case 86: return "Snow showers ❄️";

    case 95: return "Thunder ⚡";
    case 96:
    case 99: return "Storm + hail 🌩️";

    default: return is_day ? "Daytime forecast 🌞" : "Night forecast 🌙";
  }
};

const getCurrentWeatherMessage = (code, is_day) => {
  switch (code) {
    case 0: // Clear sky
      return is_day
        ? "It’s sunny and bright right now ☀️"
        : "A calm, clear night sky above 🌌";

    case 1:
      return is_day
        ? "Mostly sunny at the moment 🌤️"
        : "Mostly clear night, just a few clouds 🌙";

    case 2:
      return is_day
        ? "Partly cloudy skies at the moment ⛅"
        : "Partly cloudy night with some stars ✨";

    case 3:
      return is_day
        ? "It’s fully overcast right now ☁️"
        : "Cloudy skies covering the night 🌑";

    case 45:
      return "Foggy conditions right now 🌫️ — visibility is low";

    case 48:
      return "Freezing fog outside ❄️🌫️ — surfaces may be icy";

    case 51: return "Light drizzle falling right now 🌦️";
    case 53: return "Steady drizzle at the moment ☔";
    case 55: return "Heavy drizzle — everything’s damp 🌧️";

    case 56: return "Light freezing drizzle — slippery roads ❄️";
    case 57: return "Icy freezing drizzle outside 🧊☔";

    case 61: return "Light rain is falling 🌦️";
    case 63: return "Moderate rain right now 🌧️";
    case 65: return "Heavy rainfall pouring down ⛈️";

    case 66: return "Light freezing rain right now ❄️🌧️";
    case 67: return "Freezing rain — ice building up fast 🧊";

    case 71: return "Snow is lightly falling ❄️";
    case 73: return "Steady snowfall at the moment 🌨️";
    case 75: return "Heavy snow coming down ❄️⛄";

    case 77: return "Snow grains in the air — tiny icy flakes 🌨️";

    case 80:
      return is_day
        ? "Slight rain showers right now 🌦️"
        : "Light nighttime showers 🌧️🌙";

    case 81:
      return is_day
        ? "On and off rain showers outside ☔"
        : "Rain showers tonight 🌧️🌙";

    case 82:
      return is_day
        ? "Heavy rain showers happening now ⛈️"
        : "Strong nighttime showers with storms ⚡🌧️";

    case 85: return "Light snow showers drifting down ❄️";
    case 86: return "Heavy snow showers at the moment 🌨️";

    case 95: return "Thunderstorm happening ⚡⛈️";
    case 96: return "Thunderstorm with small hail ⚡🌩️";
    case 99: return "Severe storm with heavy hail 🌩️❄️";

    default:
      return is_day
        ? "Weather data unavailable — looks like daytime 🌞"
        : "Weather data unavailable — nighttime skies 🌙";
  }
};
const getSmallAlerts = (v, data) => {
  if (v === 't') {
    //console.log('show temp msg');
    if (data <= 0) return 'Freezing cold ❄️';
    else if (data > 0 && data <= 10) return 'Chilly outside 🧥';
    else if (data > 10 && data <= 20) return 'Cool and pleasant 🌤️';
    else if (data > 20 && data <= 30) return 'Comfortably warm ☀️';
    else if (data > 30 && data <= 35) return 'Sticky Heat Alert 🔥';
    else return 'Scorching Heat Alert 🌡️';

  } else if (v === 'p') {
    //console.log('show precip msg');
    if (data > 0 && data <= 0.2) return 'Barely a drizzle 🌫️';
    else if (data > 0.3 && data <= 2.5) return 'Light rain 🌦️';
    else if (data > 2.6 && data <= 7.5) return 'Moderate rain ☔';
    else if (data > 7.5) return 'Heavy rain ⛈️';
    else return 'No rain expected ☀️';

  } else if (v === 'c') {
    //console.log('show cloud msg');
    if (data >= 0 && data <= 10) return 'Clear skies ☀️';
    else if (data > 10 && data <= 30) return 'Mostly sunny 🌤️';
    else if (data > 30 && data <= 60) return 'Partly cloudy ⛅';
    else if (data > 60 && data <= 90) return 'Mostly cloudy ☁️';
    else return 'Overcast 🌑';

  } else { // humidity
    //console.log('show humid msg');
    if (data >= 0 && data <= 30) return 'Dry air 🌵';
    else if (data > 30 && data <= 50) return 'Comfortable humidity 😊';
    else if (data > 50 && data <= 70) return 'A bit humid 🌫️';
    else if (data > 70 && data <= 85) return 'Very humid 💦';
    else return 'Oppressively humid 🌊';
  }
};


const getMessage = ()=>{
  if(clickbtn.default && currentData){
    //console.log('show current msgs')
    return getCurrentWeatherMessage(currentData.weathercode,currentData.is_day)
  }
  else if(clickbtn.hourbtn && hourlyForecast){
    //console.log('show hourly msgs');
    return getHourlyMessage(hourlyForecast.weathercode[hIndex],hourlyForecast.is_day[hIndex]);
  }
  else if(clickbtn.daybtn && DailyWeather){
    //console.log('show daily msgs');
    return getDailyMessage(DailyWeather.weathercode[Math.floor(indexVal.start/24)],currentData.is_day)
  }
}
  return (
 <>
 <div className=' w-full lg:w-[35%] h-full p-5 rounded-2xl bg-[#0000005c] mb-4 lg:mb-1'>
   <div className='flex flex-col justify-center pt-2 pb-2 w-full h-full relative'>
     
          <div className='w-[90%] m-auto p-1.5 h-auto font-extrabold text-[18px] text-center '>
            {displayLocation? displayLocation:'loading...'}
          </div>

        <div className='h-[55%]   w-[90%] text-center p-10 mb-2'>
          <p className='h-[35%] flex justify-center  items-center text-5xl font-bold p-3'> 
                        {clickbtn.default===true ? (currentData ? currentData.temperature_2m:'loading..'):getData('temperature_2m')
                        }°
          </p>
          <p>

    {
  showDayTime()
  }
          </p>
            <p className='h-[10%]  flex justify-center items-center text-[18px] font-bold p-3'> 
           <span className='mr-3'>
             {
             clickbtn.default===true ? (currentData ? hourlyForecast?hourlyForecast.precipitation_probability[parseInt(new Date().toLocaleTimeString([],{hour12:false}))]:'loading...':'loading..'):getData('precipitation_probability')
             
             }%
             </span><img src={clickbtn.default && currentData ? getWeatherIcon(currentData.weathercode,currentData.is_day) : setIcon()} alt="weather-icon" className="w-8 h-8" />
             
            </p>
            <p className='h-[27%]  flex justify-center items-center p-3'>
               {
              getMessage()
              }
            </p>
                  
        </div>
     <div className='w-full h-[48%]'>
      <div className='flex justify-between  h-[40%] mb-3'>
        <div className='bg-[#000000a3] w-[40%] flex rounded-2xl justify-center items-center  h-full'>
              <div className='w-full h-full p-2 '>
                <p className='text-[12px] pb-2'>FEELS LIKE</p>
                <p className='text-[20px] font-bold pb-2'>{clickbtn.default===true && currentData ? currentData.apparent_temperature : getData('apparent_temperature')
                }°</p>
                <p className='text-[12px] pb-2'> {getSmallAlerts('t',clickbtn.default===true && currentData ? currentData.apparent_temperature : getData('apparent_temperature'))}</p>
              </div>
            </div>
            <div className='bg-[#000000a3] w-[40%] flex rounded-2xl justify-center items-center  h-full'>
                <div className='w-full h-full p-1.5'>
                 <p className='text-[12px] pb-2'>PRECIPITATION</p>
                 <p className='text-[20px] font-bold pb-2'>{clickbtn.default===true && currentData ? currentData.precipitation : getData('precipitation')
                  }mm</p>
                 <p className='text-[12px] pb-2'>{getSmallAlerts('p',getData('precipitation',clickbtn.default===true && currentData ? currentData.precipitation : getData('precipitation')))}</p>
                  </div>
              </div>
                  </div>
                  <div className='flex justify-between h-[40%]'>
                    <div className='bg-[#000000a3] w-[40%] flex rounded-2xl justify-center items-center  h-full'>
                      <div className='w-full h-full p-1.5'>
                        <p className='text-[12px] pb-2'>CLOUD COVER</p>
                        <p className='text-[20px] font-bold pb-2'>{clickbtn.default===true && currentData ? currentData.cloud_cover : getData('cloud_cover')
                          }%</p>
                        <p className='text-[12px] pb-2'>{getSmallAlerts('c',getData('cloud_cover',clickbtn.default===true && currentData ? currentData.cloud_cover : getData('cloud_cover')))}</p>
                      </div>

                    </div>
                    <div className='bg-[#000000a3] w-[40%] flex rounded-2xl justify-center items-center  h-full'>
                        <div className='w-full h-full p-1.5'>
                        <p className='text-[12px] pb-2'>HUMIDITY</p>
                        <p className='text-[20px] font-bold pb-2'>{clickbtn.default===true && currentData ? currentData.relative_humidity_2m : getData('relative_humidity_2m')
                          }%</p>
                        <p className='text-[12px] pb-2'>{getSmallAlerts('h',clickbtn.default===true && currentData ? currentData.relative_humidity_2m : getData('relative_humidity_2m'))}</p>
                    </div>
                    </div> 
                  </div>
                </div>
                </div>
            </div>
    </>
  )
}

export default TodayWeather
