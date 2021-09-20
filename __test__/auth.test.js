const request = require("supertest");
const { sequelize, User } = require("../models");
const { queryInterface } = sequelize;
const app = require("../app");

describe("POST /register - (user register test)", () => {
  const data = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    password: "john",
  };

  const data1 = {
    name: "John JS",
    email: "johnjs@gmail.com",
    password: "john",
  };

  // Create one user for testing unique email
  beforeAll((done) => {
    User.create(data)
      .then((result) => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  afterAll((done) => {
    queryInterface
      .bulkDelete("Users", {})
      .then(() => done())
      .catch((err) => done(err));
  });

  test(`201 Registration successful`, (done) => {
    request(app)
      .post("/register")
      .send(data1)
      .then((response) => {
        const { body } = response;
        expect(body).toHaveProperty("code");
        expect(body.code).toBe(201);
        expect(body).toHaveProperty("status");
        expect(body.status).toBe("success");
        expect(body).toHaveProperty("user");
        expect(body.user).toEqual(expect.any(Object));

        const { user } = body;

        expect(user).toHaveProperty("email");
        expect(user.email).toBe(data1.email);
        done();
      });
  });
});
