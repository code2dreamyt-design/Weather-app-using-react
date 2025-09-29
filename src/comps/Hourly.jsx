// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Hourly = ({ hourlyForecast, hvalue, onClickhour,getWeatherIcon}) => {
  // hours: [{ prob, time, index }]
  const [hours, setHours] = useState([]);

  useEffect(() => {
    if (!hourlyForecast) {
      setHours([]);
      return;
    }
    
    const { start, end } = hvalue;
    const times = hourlyForecast.time || [];
    const probs = hourlyForecast.precipitation_probability || [];

    // normalize slice bounds
    const sliceStart = Math.max(0, start);
    const sliceEnd = Math.min(times.length, end);
    //console.log(sliceStart,sliceEnd)
    // take slices
    const slicedTimes = times.slice(sliceStart, sliceEnd);
    const slicedProbs = probs.slice(sliceStart, sliceEnd);
    
    // zip into objects, use min length to avoid undefined pairs
    const n = Math.min(slicedTimes.length, slicedProbs.length);
    const zipped = [];
    for (let i = 0; i < n; i += 1) {
      zipped.push({
        prob: slicedProbs[i],
        time: slicedTimes[i],
        index: sliceStart + i, // absolute index in original forecast
      });
    }

    setHours(zipped);
  }, [hourlyForecast, hvalue]);

  const now = new Date();

  const formatHour = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleTimeString([], { hour: "2-digit"});
  };

  const handleClick = (i) => {
    const item = hours[i];
    if (!item) return;
    const dflt = false;
    const daybtn = false;
    const hourbtn = true;
    const finalIndex = item.index; // absolute index — correct mapping to original array
    console.log("Clicked hour:", i, "absoluteIndex:", finalIndex);
    onClickhour(dflt, daybtn, hourbtn, finalIndex);
  };

  // Render
  return (
    <div className="flex justify-around items-center h-[100%] md:h-[70%] overflow-x-auto">
      {hours && hours.length > 0 ? (
        hours.map((h, i) => {
          const t = new Date(h.time);
          // show "Now" only when the first slice item time is within ±1 hour of current time
          const showNow = i === 0 && Math.abs(t - now) < 60 * 60 * 1000;
          return (
            <div
              key={h.index}
              className="h-full w-[25%] md:w-[17%] flex-shrink-0 flex flex-col justify-bet items-center cursor-pointer p-3"

              onClick={() => {handleClick(i);
                console.log(h,i,h.index)
              }}
            >
              <p className="text-[12px]">{showNow ? "Now" : formatHour(h.time)}</p>
              <p className="font-bold text-xl p-3">{h.prob}%</p>
              <img src={hourlyForecast?getWeatherIcon(hourlyForecast.weathercode[h.index],hourlyForecast.is_day[h.index]):'loading..'} alt="weather-icon" className="w-7 h-7" />
            </div>
          );
        })
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

Hourly.propTypes = {
  hourlyForecast: PropTypes.shape({
    precipitation_probability: PropTypes.arrayOf(PropTypes.number),
    time: PropTypes.arrayOf(PropTypes.string),
    weathercode: PropTypes.arrayOf(PropTypes.number), // Added weathercode validation
    is_day: PropTypes.arrayOf(PropTypes.number), // Added is_day validation
  }),
  hvalue: PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  }).isRequired,
  onClickhour: PropTypes.func.isRequired,
  getWeatherIcon: PropTypes.func.isRequired,
};

export default Hourly;
