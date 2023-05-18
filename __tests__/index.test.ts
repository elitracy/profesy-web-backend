import request from "supertest";
import app from "app";
describe("Frontend Status", () => {
  it("Home page 200 status code", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
  });
});
