import { count } from "console";

const ResponseFormatter = (queries: any) => {
    const formattedQueries = queries.map((q: any) => ({
        userEmail: q.user?.email || "Unknown",
        userId: q.user?.id || q.userId,
        city: q.city,
        country: q.country,
        temperature: q.temperature,
        humidity: q.humidity,
        windSpeed: q.windSpeed,
        weatherDescription: q.weatherDescription,
        createdAt: q.createdAt,
        
      }));
    return formattedQueries;
}

const utils = {
    ResponseFormatter,
}
export default utils;