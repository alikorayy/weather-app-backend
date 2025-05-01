import {
  getAllWeatherQueriesHandler,
  getUserWeatherQueriesHandler,
  searchWeatherHandler,
} from "../../../../src/api/controllers/weatherController";
import { Request, Response, NextFunction } from "express";
import * as weatherService from "../../../../src/api/services/weatherService";
import testConstants from "../testConstants";

describe("Weather Queries Handlers", () => {
  afterAll(() => {
    jest.clearAllMocks(); // clears spies
  });
  it("should return all weather queries", async () => {
    jest
      .spyOn(weatherService, "getAllWeatherQueriesService")
      .mockResolvedValue(testConstants.mockQueriesForAllUsers);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    await getAllWeatherQueriesHandler(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      testConstants.formattedMockedQueriesResponse
    );
  });

  it("should fetch users weather queries", async () => {
    jest
      .spyOn(weatherService, "getUserWeatherQueriesService")
      .mockResolvedValue(testConstants.mockQueryForUser);

    const req = {
      user: { userId: testConstants.mockUserId },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    await getUserWeatherQueriesHandler(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(testConstants.mockResponseForUser);
  });

  it("should handle errors when fetching weather query for user", async () => {
    const errorMessage = "Error fetching weather query for user";
    jest
      .spyOn(weatherService, "getUserWeatherQueriesService")
      .mockRejectedValue(new Error(errorMessage));

    const req = {
      user: { userId: testConstants.mockUserId },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    await getUserWeatherQueriesHandler(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      data: {
        errorDetails: errorMessage,
      },
    });
  });

  it("should return weather data for search endponint when city is valid", async () => {
    jest
      .spyOn(weatherService, "searchWeatherService")
      .mockResolvedValue(testConstants.mockWeatherData);

    const req = {
      body: { city: testConstants.mockCity },
      user: { userId: testConstants.mockUserId },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    await searchWeatherHandler(req, res, next);

    expect(weatherService.searchWeatherService).toHaveBeenCalledWith(
      testConstants.mockCity,
      testConstants.mockUserId
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      testConstants.mockResponseWeatherData
    );
  });
  it("should return 400 if city is missing or invalid", async () => {
    const req = {
      body: {},
      user: { userId: "user-123" },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    await searchWeatherHandler(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      data: {
        errorDetails: [
          {
            field: "city",
            message: "Required",
          },
        ],
      },
    });
  });

  it("should return 500 if service throws an error", async () => {
    const req = {
      body: { city: "Istanbul" },
      user: { userId: "user-123" },
    } as unknown as Request;
  
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  
    const next = jest.fn() as NextFunction;
  
    const errorMessage = "Something failed";
  
    jest
      .spyOn(weatherService, "searchWeatherService")
      .mockRejectedValue(new Error(errorMessage));
  
  
    await searchWeatherHandler(req, res, next);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      data: {
        errorDetails: errorMessage,
      },
    });
  });
});
