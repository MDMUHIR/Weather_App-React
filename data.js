
// Function to fetch weather data
export const fetchApi = async (city, setError, setWeather) => {
  const API_KEY = "f16c7e20ea10287c9edb0ddc4249a50e"; // Replace with your OpenWeatherMap API key

  // Function to fetch weather data
  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    try {
      setError(null); // Reset error
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found or API error.");
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError(error.message);
      setWeather(null);
    }
  };
  return fetchWeather();
};
