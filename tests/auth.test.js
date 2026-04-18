import request from "supertest";
import app from "../src/app.js";
import User from "../src/models/User.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

describe("Auth Routes", () => {

  let token;

  beforeAll(async () => {
    // Clear users before testing
    await User.deleteMany({});
  });

  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "123456"
      });

    console.log(res.body); // helps debugging

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe("test@example.com");
  });

  it("should login user and return token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    token = res.body.token;
  });

});
import mongoose from "mongoose";

afterAll(async () => {
  await mongoose.connection.close();
});