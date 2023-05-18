import request from "supertest";
import app from "app";

describe("Get professors", () => {
  it("Get all professors", async () => {
    const response = await request(app).get("/professors");

    expect(response.statusCode).toBe(200);
  });

  // it("Get professor by name", async () => {
  //   const response = await request(app).get("/professors/LEYK T");
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.name === "LEYK T");
  // });
});
