import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { app } from "../../../../app";

let connection: Connection;
describe("Create user", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able create new user", async () => {
    const response = await request(app).post("/api/v1/users").send({
      name: "Fernando",
      email: "fernando@hotmail.com",
      password: "123456",
    });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new User with email existent", async () => {
    await request(app).post("/api/v1/users").send({
      name: "Fernando",
      email: "fernando@hotmail.com",
      password: "123456",
    });

    const response = await request(app).post("/api/v1/users").send({
      name: "Fernando2",
      email: "fernando@hotmail.com",
      password: "123456",
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "User already exists" });
  });
});