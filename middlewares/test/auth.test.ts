import { jest } from "@jest/globals";
import { authorize } from "../auth.js";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

describe("middleware", () => {
  const mockJson = jest.fn();
  const mockStatus = jest.fn((code: number) => ({ json: mockJson })) as any;
  let mockResponse: Partial<Response> = { status: mockStatus };
  let mockRequest: Request = { headers: {} } as Request;
  let mockNextFunction: NextFunction = jest.fn();

  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

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

        await authorize(mockRequest, mockResponse as Response, mockNextFunction);

        expect(mockStatus).toBeCalledWith(401);
        expect(mockJson).toBeCalledWith(expectedResponse);
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

        await authorize(mockRequest, mockResponse as Response, mockNextFunction);

        expect(mockStatus).toBeCalledWith(401);
        expect(mockJson).toBeCalledWith(expectedResponse);
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

        await authorize(mockRequest, mockResponse as Response, mockNextFunction);

        expect(mockStatus).toBeCalledWith(401);
        expect(mockJson).toBeCalledWith(expectedResponse);
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

        await authorize(mockRequest, mockResponse as Response, mockNextFunction);

        expect(mockStatus).not.toBeCalled();
        expect(mockJson).not.toBeCalled();
      });
    });
  });
});
