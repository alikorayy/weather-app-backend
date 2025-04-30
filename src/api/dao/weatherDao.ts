import { PrismaClient } from "@prisma/client";
import { WeatherData } from "../interfaces/weatherData.interface"

const prisma = new PrismaClient();

export const saveWeatherQuery = async (userId: string, weatherData: WeatherData) => {
    try {
        const weatherQuery = await prisma.weatherQuery.create({
            data: {
                userId,
                city: weatherData.city,
                country: weatherData.country,
                temperature: weatherData.temperature,
                humidity: weatherData.humidity,
                weatherDescription: weatherData.weatherDescription,
                windSpeed: weatherData.windSpeed,
            },
        });
        return weatherQuery;
    } catch (error) {
        console.error("Error saving weather query:", error);
        throw new Error("Failed to save weather query.");
    }
}