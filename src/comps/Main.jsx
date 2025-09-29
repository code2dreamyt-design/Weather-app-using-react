/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import TodayWeather from './TodayWeather'
import OtherWeather from './OtherWeather'
import Nav from './Nav'
import axios from 'axios'

const Main = ({api_key}) => {
  const [data,setData] = useState('loading...');
  const [value,setValue] = useState({start:0,end:24,daynum:'0'});
  const [hIndex,sethIndex] = useState(0);
  const [clickbtn,setClickBtn] = useState({default:true,daybtn:false,hourbtn:false})
  const [error,setError]=useState(null);
  const [coordinates,setCoordinates]=useState({lat:"31.2025299",lon:"77.7515958",Name:'Rohru, Shimla, Himachal Pradesh, 171207, India'});
  const [locationData,setLocationData]=useState(null);
  const [location,setLocation] = useState('');


  const getSearchedData = (sData)=>{
    setLocation(sData);
    console.log(location)
  }
  const getLatLon = (geoChord)=>{
    setCoordinates(geoChord)
    console.log(coordinates)
  }
  //location fetching 
  useEffect(()=>{
    if(location.length<3) return;
    const locationFetch = setTimeout(async ()=>{
      const res =await axios.get(`https://us1.locationiq.com/v1/search?key=${api_key}&q=${encodeURIComponent(location)}&format=json`);
      try {
        console.log(res.data);
        setLocationData(res.data);
      } catch (err) {
        setError('not found');
      console.log(error,err);
      }
    },1000);
    return ()=>clearTimeout(locationFetch);
  },[location, api_key, error])

 useEffect(()=>{
  //console.log('fetching data')
  const fetchWeatherData = async () => {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}
&daily=uv_index_max,relative_humidity_2m_mean,cloud_cover_mean,snowfall_sum,rain_sum,precipitation_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,sunset,sunrise,apparent_temperature_max,apparent_temperature_min,temperature_2m_max,temperature_2m_min,weathercode
&hourly=apparent_temperature,precipitation,precipitation_probability,relative_humidity_2m,wind_speed_10m,temperature_2m,cloud_cover,snowfall,weathercode,is_day
&current=temperature_2m,relative_humidity_2m,is_day,apparent_temperature,rain,precipitation,snowfall,cloud_cover,wind_speed_10m,wind_gusts_10m,weathercode
&timezone=Asia/Kolkata
`);
    try {
//api fetching
      if (response) {//if not loaded then error is thrown
      const weatherData = await response.json();//waiting till the data is fetched
      setData(weatherData);//data is updated using useState
      console.log(weatherData)
      }
    } catch (err) {
      setError('Not Found');
      console.log(error,err)
    }
  };
 
  fetchWeatherData();
 },[coordinates.lat,coordinates.lon,error]);//only rendered once
 //console.log(data);
  const hourlydata = (start,end,day)=>{
    setValue({start,end,day});
   // console.log(value)
  }
  const stateVals = (dflt,daybtn,hourbtn,hIndex)=>{
    setClickBtn({dflt,daybtn,hourbtn});
    console.log(clickbtn)
    sethIndex(hIndex)
  }
  useEffect(()=>{
    console.log(location)
  },[location]);
const getWeatherIcon = (code, is_day) => {
  console.log(is_day,code)
  switch (code) {
    // --- Clear Sky ---
    case 0:
      return `/assets/images/0_${is_day ? "0" : "1"}.png`;

    // --- Mainly clear, partly cloudy, overcast ---
    case 1:
    case 2:
       return `/assets/images/${code}_${is_day ? "0" : "1"}.png`;
    case 3: return "/assets/images/3_0.png"
     

    // --- Fog & rime fog ---
    case 45:
    case 48:
      return "/assets/images/45_48.png";

    // --- Drizzle: light, moderate, dense ---
    case 51:
    case 53:
    case 55:
      return `/assets/images/${code}.png`;

    // --- Freezing drizzle ---
    case 56:
    case 57:
      return "/assets/images/56_57.png";

    // --- Rain: slight, moderate, heavy ---
    case 61:
    case 63:
    case 65:
      return `/assets/images/${code}.png`;

    // --- Freezing rain ---
    case 66:
    case 67:
      return "/assets/images/66_67.png";

    // --- Snow fall: slight, moderate, heavy ---
    case 71:
    case 73:
    case 75:
      return `/assets/images/${code}.png`;

    // --- Snow grains ---
    case 77:
      return "/assets/images/77.png";

    // --- Rain showers: slight, moderate, violent ---
    case 80:
    case 81:
    case 82:
      return `/assets/images/${code}_${is_day ? "0" : "1"}.png`;

    // --- Snow showers ---
    case 85:
    case 86:
      return `/assets/images/85_86_${is_day ? "0" : "1"}.png`;

    // --- Thunderstorm ---
    case 95:
      return "/assets/images/95.png";

    // --- Thunderstorm with hail ---
    case 96:
    case 99:
      return "/assets/images/96_99.png";

    // --- Default fallback ---
    default:
      return `/assets/images/1_${is_day ? "0" : "1"}.png`;
  }
};


  return (
    
    <> 
   <div className='min-h-screen w-full  bg-cover bg-no-repeat bg-center text-white '  style={{ backgroundImage: `url('//assets/bgImages/partlynightcloud.webp')` }}>
           <Nav
        locationData={locationData}
    getSearchedData={getSearchedData} 
    getLatLon={getLatLon}/>
      <div className='w-full md:w-[95%] h-full bg-[#000000c2] flex flex-col lg:flex-row justify-between items-center md:rounded-4xl md:p-4  m-auto'>
  <TodayWeather 
    currentData={data.current}  
    DailyWeather={data.daily} 
    hourlyForecast={data.hourly} 
    indexVal={value} 
    clickbtn={clickbtn} 
    hIndex={hIndex}  
    displayLocation = {coordinates.Name}
    getWeatherIcon={getWeatherIcon}
  />

  <OtherWeather 
    DailyWeather={data.daily} 
    hourlyForecast={data.hourly} 
    uvIndex={data.daily}  
    hourlydata={hourlydata} 
    stateVals={stateVals} 
    value={value} 
    getWeatherIcon={getWeatherIcon}
  />
</div>
       
      </div>
    </>
  )
}

export default Main
