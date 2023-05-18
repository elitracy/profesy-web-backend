import request from "supertest";
import app from "app";

describe("Create Get and Remove User", () => {
  let user_id = "";
  const user_info = {
    name: "Foo Guy",
    email: "foo@example.com",
    username: "fooguy",
    password: "foopass",
  };

  it("There should be no users", async () => {
    const response = await request(app).get("/users");

    expect(response.statusCode).toBe(200);
    expect(response.body.length == 0);
  });

  it("Create foo user", async () => {
    const response = await request(app).post("/users").send(user_info);

    expect(response.statusCode).toBe(200);

    expect(response.body.email == user_info.email);
    expect(response.body.name == user_info.name);
    expect(response.body.password == user_info.password);
    expect(response.body.username == user_info.username);
    expect(response.body.id);
    user_id = response.body.id;
  });

  it("There should be 1 user", async () => {
    const response = await request(app).get("/users");

    expect(response.statusCode).toBe(200);
    expect(response.body.length == 1);
  });

  it("Get user by id query", async () => {
    const response = await request(app).get(`/users/${user_id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.email == user_info.email);
    expect(response.body.name == user_info.name);
    expect(response.body.password == user_info.password);
    expect(response.body.username == user_info.username);
    expect(response.body.id);
  });

  it("Get user by email query", async () => {
    const response = await request(app)
      .post(`/users/email`)
      .send({ email: user_info.email });

    expect(response.statusCode).toBe(200);
    expect(response.body.email == user_info.email);
    expect(response.body.name == user_info.name);
    expect(response.body.password == user_info.password);
    expect(response.body.username == user_info.username);
    expect(response.body.id);
  });

  it("Remove the user by id", async () => {
    const response = await request(app).delete(`/users/${user_id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.email == user_info.email);
    expect(response.body.name == user_info.name);
    expect(response.body.password == user_info.password);
    expect(response.body.username == user_info.username);
    expect(response.body.id);
  });

  it("There should be no users", async () => {
    const response = await request(app).get("/users");

    expect(response.statusCode).toBe(200);
    expect(response.body.length == 0);
  });
});
