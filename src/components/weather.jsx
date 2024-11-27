import { useState } from "react";

import weatherSvg from "../assets/icons/weather.svg";

import hazeSVG from "../assets/icons/haze.svg";
import sunSvg from "../assets/icons/sun.svg";
import cloudySVG from "../assets/icons/cloudy.svg";

const WeatherApp = () => {
  const [city, setCity] = useState(""); // Input city name
  const [weather, setWeather] = useState(null); // Store weather data
  const [sunRise, setSunrise] = useState(null);
  const [sunSet, setSunset] = useState(null);
  const [error, setError] = useState(null); // Handle errors

  const API_KEY = "f16c7e20ea10287c9edb0ddc4249a50e"; // Replace with your OpenWeatherMap API key

  // getting time
  const getFormattedTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // 12-hour format
    });
  };

  // Function to fetch weather data
  const fetchWeather = async () => {
    if (!city) {
      setError("Please Enter A City Name...");
      return;
    } else {
      try {
        setError(null); // Reset error
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        console.log(response);

        if (!response.ok) {
          throw new Error("City not found or API error.");
        } else {
          const data = await response.json();
          console.log(data);
          setWeather(data);
          const sunriseTime = getFormattedTime(data.sys.sunrise);
          const sunsetTime = getFormattedTime(data.sys.sunset);

          setSunrise(sunriseTime);
          setSunset(sunsetTime);
        }
      } catch (error) {
        console.log(error);
        setError(error.message);
        setWeather(null);
      }
    }
  };
  return (
    <div className="h-screen bg-gradient-to-r from-[#969595e7] to-[#969595e7]">
      <h1 className="text-2xl text-[#af4848] text-pretty font-serif font-bold italic  p-2 mb-16">
        Weather App/React.js
      </h1>

      <div className="form-feild flex  justify-center items-center  ">
        <div className="relative w-full max-w-sm min-w-[200px]  h-[44px] bg-white rounded-l-md  ">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className=" absolute  left-0 top-0 right-0 peer   w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg  font-semibold  rounded-l-md px-3 py-2 transition duration-300 ease focus:outline-none     shadow-inner focus:shadow-black z-20 "
          />
          <label
            className={`absolute cursor-text     rounded-md transition-all transform origin-left peer-focus:-top-8  peer-focus:-left-[1px]   peer-focus:text-xl peer-focus:font-semibold peer-focus:text-white z-10 ${
              city !== ""
                ? " text-white peer-focus:bg-transparent -left-[1px] -top-8 text-xl font-semibold "
                : "text-black  left-2.5 top-2.5 text-md "
            }`}
          >
            Enter city name
          </label>
        </div>
        <button
          onClick={fetchWeather}
          className="px-4 py-[10px]  rounded-r-md  font-semibold bg-white   hover:/25 shadow-inner hover:shadow-black duration-300 ease "
        >
          Search
        </button>
      </div>

      {error && <p className="text-center mt-5 ">{error}</p>}
      {/* React requires JSX (JavaScript XML) for rendering. Since JSX is an expression, you can't directly use standard control structures (like if or else) inside JSX. Instead, you use JavaScript expressions like {} to dynamically render content.
             Without Conditional Rendering
             You would need to write:
             
             {error ? <p>{error}</p> : null} */}

      {weather && (
        <div className="showCase flex justify-center items-center my-10 ">
          <div className="p-10 rounded-2xl   shadow-2xl bg-[url('/public/images/bg.jpg')] bg-cover bg-center h-[30rem]">
            <h2 className="text-[1.4rem] font-bold text-white bg-black/25  text-center">
              {weather.name}, {weather.sys.country}
            </h2>
            <div className="weather-text flex justify-between items-center my-2">
              {/* <img src={weatherSvg} alt="" className="w-20 mx-auto " /> */}

              <div className="weather_description text-center mr-2 px-3">
                {weather.weather[0].main == "Haze" && (
                  <img src={hazeSVG} alt="" className="w-12 mx-auto" />
                )}
                {weather.weather[0].main == "Clouds" && (
                  <img src={cloudySVG} alt="" className="w-12  mx-auto" />
                )}
                <p className="font-mono text-lg font-thin  text-white capitalize ">
                  {weather.weather[0].description}
                </p>
              </div>

              <p
                className={`num  text-[50px] font-serif font-light rounded-lg bg-black/50 shadow-inner shadow-white px-4  ${
                  weather.main.temp > 25
                    ? "text-[#ff5816]" // Hot temperature: red
                    : "text-[#dbdcff]" // Cool temperature: blue
                }`}
              >
                {weather.main.temp}
                <span className="text-white text-2xl font-bold  font-sans align-super">
                  °C
                </span>
              </p>
            </div>

            {/* Weathe details */}

            <p className="text-lg font-mono font-medium bg-white/75 mb-2 p-2 rounded-lg text-center mt-2 shadow-inner shadow-black">
              Feel like:{" "}
              <span className="num ml-2 text-[25px] font-serif font-normal  text-[#000]   px-2 rounded-lg">
                {weather.main.feels_like}
                <span className="text-[#ff6a24] text-xs font-sans align-super">
                  °C
                </span>
              </span>
            </p>
            <p className="text-lg font-mono font-medium bg-white/75 mb-2 p-2 rounded-lg text-center mt-2 shadow-inner shadow-black">
              Humidity:{" "}
              <span className="num ml-2 text-[25px] font-serif font-normal  text-[#000]   px-2 rounded-lg">
                {weather.main.humidity}%
              </span>
            </p>
            <p className="text-lg font-mono font-medium bg-white/75 mb-2 p-2 rounded-lg text-center shadow-inner shadow-black ">
              Wind Speed:{" "}
              <span className="num ml-2 text-[25px] font-serif font-normal text-[#000]    px-2 rounded-lg">
                {weather.wind.speed} m/s
              </span>
            </p>
            {/* Sun details */}
            <p className="font-bold mt-4 text-white">Sun:</p>
            <div className="sun-details flex justify-between items-center   text-lg bg-black/75 font-mono text-white p-2 rounded-lg  shadow-inner shadow-gray-300">
              <p className="   ">
                🌅 <span className="">{sunRise}</span>
              </p>
              <img src={sunSvg} alt="" className="w-6 mx-3" />
              <p className=" ">
                🌇 <span className="">{sunSet}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
