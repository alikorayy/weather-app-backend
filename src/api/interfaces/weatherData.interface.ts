export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  humidity: number;
  weatherDescription: string;
  windSpeed: number;
}

export interface OpenWeatherResponse {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
}
