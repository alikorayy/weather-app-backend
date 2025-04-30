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

export const getUserWeatherQueries = async (userId: string) => {
    return prisma.weatherQuery.findMany({
        where: {userId},
        orderBy: { createdAt: "desc" },
    })
}

export const getAllWeatherQueries = async () => {
    return prisma.weatherQuery.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  };