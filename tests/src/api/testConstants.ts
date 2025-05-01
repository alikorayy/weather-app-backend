const mockQueriesForAllUsers = [
  {
    id: "1",
    city: "Istanbul",
    country: "Turkey",
    temperature: 12.5,
    humidity: 65,
    weatherDescription: "clear sky",
    windSpeed: 5.2,
    createdAt: new Date("2025-04-30T12:00:00Z"),
    userId: "user1",
    user: {
      id: "user1",
      email: "admin@example.com",
    },
  },
];

const mockQueryForUser = [
  {
    id: "1",
    userId: "1",
    city: "London",
    country: "GB",
    temperature: 25.55,
    humidity: 34,
    weatherDescription: "few clouds",
    windSpeed: 0.89,
    createdAt: new Date("2025-04-30T13:51:06.038Z"),
  },
];

const mockWeatherData = {
  city: "Istanbul",
  country: "TR",
  temperature: 9.7,
  humidity: 51,
  weatherDescription: "scattered clouds",
  windSpeed: 8.75,
};

const mockResponseForUser = {
  data: [
    {
      id: "1",
      userId: "1",
      city: "London",
      country: "GB",
      temperature: 25.55,
      humidity: 34,
      weatherDescription: "few clouds",
      windSpeed: 0.89,
      createdAt: new Date("2025-04-30T13:51:06.038Z"),
    },
  ],
};

const formattedMockedQueriesResponse = {
  data: [
    {
      userEmail: "admin@example.com",
      userId: "user1",
      city: "Istanbul",
      country: "Turkey",
      temperature: 12.5,
      humidity: 65,
      windSpeed: 5.2,
      weatherDescription: "clear sky",
      createdAt: new Date("2025-04-30T12:00:00Z"),
    },
  ],
};

const mockResponseWeatherData = {
  data: {
    city: "Istanbul",
    country: "TR",
    temperature: 9.7,
    humidity: 51,
    weatherDescription: "scattered clouds",
    windSpeed: 8.75,
  },
};

const mockUserId = "mockUserId";
const mockCity = "Istanbul";

const testConstants = {
  mockQueriesForAllUsers,
  mockQueryForUser,
  mockWeatherData,
  formattedMockedQueriesResponse,
  mockUserId,
  mockCity,
  mockResponseForUser,
  mockResponseWeatherData,
};
export default testConstants;
