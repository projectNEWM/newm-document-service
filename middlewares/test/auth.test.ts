import { jest } from "@jest/globals";
import { authorize } from "../auth.js";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

describe("middleware", () => {
  const json = jest.fn();
  const status = jest.fn((code: number) => ({
    json,
  })) as any;
  let mockRequest: Request;
  let mockResponse: Partial<Response> = {
    status,
  };
  let nextFunction: NextFunction = jest.fn();

  const res = {
    status,
  } as any;

  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    mockRequest = {} as Request;
    mockResponse = res;

    process.env = { ...env, JWT_SECRET: "S3CR3T" };
  });

  afterEach(() => {
    process.env = env;
  });

  describe("authorize()", () => {
    describe("when the token is not present", () => {
      it("returns the correct error response", async () => {
        const expectedResponse = {
          message: "Invalid token",
        };

        mockRequest = {
          headers: {},
        } as any;

        await authorize(mockRequest, mockResponse as Response, nextFunction);

        expect(status).toBeCalledWith(401);
        expect(json).toBeCalledWith(expectedResponse);
      });
    });

    describe("when the token is invalid", () => {
      it("returns the correct error response", async () => {
        const expectedResponse = {
          message: "Invalid token",
        };

        mockRequest = {
          headers: {
            authorization: `Bearer INVALIDTOKEN`,
          },
        } as any;

        await authorize(mockRequest, mockResponse as Response, nextFunction);

        expect(status).toBeCalledWith(401);
        expect(json).toBeCalledWith(expectedResponse);
      });
    });

    describe("when the token is expired", () => {
      it("returns the correct error response", async () => {
        const expectedResponse = {
          message: "Expired token",
        };

        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() - 2);
        const expiredTimestamp = currentDate.getTime() / 1000;

        const secret = process.env.JWT_SECRET as jwt.Secret;
        const token = jwt.sign({ exp: expiredTimestamp }, secret);

        mockRequest = {
          headers: {
            authorization: `Bearer ${token}`,
          },
        } as any;

        await authorize(mockRequest, mockResponse as Response, nextFunction);

        expect(status).toBeCalledWith(401);
        expect(json).toBeCalledWith(expectedResponse);
      });
    });

    describe("when the token is valid", () => {
      it("does not return an error", async () => {
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + 1);
        const futureTimestamp = currentDate.getTime() / 1000;

        const secret = process.env.JWT_SECRET as jwt.Secret;
        const token = jwt.sign({ exp: futureTimestamp }, secret);

        mockRequest = {
          headers: {
            authorization: `Bearer ${token}`,
          },
        } as any;

        await authorize(mockRequest, mockResponse as Response, nextFunction);

        expect(status).not.toBeCalled();
        expect(json).not.toBeCalled();
      });
    });
  });
});
