import axios from "axios";
import appConstants from "../../constants/appConstants";
import { WeatherData, OpenWeatherResponse } from "../interfaces/weatherData.interface";
import { saveWeatherQuery } from "../dao/weatherDao";
import redisClient from "../../config/redisClient";

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY!;

export const searchWeatherService = async (city: string, userId: string) => {
    try {
        const cacheKey = `weather:${city.toLowerCase()}`;
        const cached = await redisClient.get(cacheKey);

        if(cached) {
            console.log("Existing weather data found in cache for city:", city);
            console.log("Cached data:", cached);
            const weatherData: WeatherData = JSON.parse(cached);
            await saveWeatherQuery(userId, weatherData);
            return weatherData;
        }
        console.log("No cached data found for city:", city);
        const baseUrl = appConstants.OPENWEATHER_BASE_URL;
        const params = {
            q: city,
            appid: OPENWEATHER_API_KEY,
            units: "metric",
        }
        const response = await axios.get<OpenWeatherResponse>(baseUrl, { params });

        if (response.status !== appConstants.RESPONSE_STATUS.OK) {
            console.error("OpenWeather responded with:", response.status, response.data);
            throw new Error(appConstants.ERRORS.WEATHER_API_ERROR);
          }
        const data = response.data;
     
        const weatherData: WeatherData = {
            city: data.name,
            country: data.sys.country,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            weatherDescription: data.weather[0].description,
            windSpeed: data.wind.speed,
        }
        await redisClient.setEx(cacheKey, appConstants.CACHE_EXPIRATION_TIME, JSON.stringify(weatherData));

        await saveWeatherQuery(userId, weatherData)
        return weatherData;
    }
    catch (error:any) {
        console.error("Error fetching weather data:", error.message);
        throw new Error(appConstants.ERRORS.WEATHER_API_ERROR);
    }
}