const request = require("supertest");
const { sequelize, User } = require("../models");
const { queryInterface } = sequelize;
const app = require("../app");

describe("POST /register - (user register test)", () => {
  const data = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    password: "johndoen",
  };

  const data1 = {
    name: "John JS",
    email: "johnjs@gmail.com",
    password: "johndoen",
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

  test(`201 Registration successful - response should have the correct property and value`, (done) => {
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
      })
      .catch((err) => {
        done(err);
      });
  });

  test(`400 Registration failed - response should have errors property if email is null`, (done) => {
    request(app)
      .post("/register")
      .send({ email: null, name: "John", password: "testing" })
      .then((response) => {
        const { body } = response;

        expect(body).toHaveProperty("code");
        expect(body.code).toBe(400);
        expect(body).toHaveProperty("status");
        expect(body.status).toBe("fail");
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("Registration failed");
        expect(body).toHaveProperty("errors");
        expect(body.errors).toEqual(expect.any(Array));
        const errorEmail = body.errors[0];
        expect(errorEmail).toBe("Email cannot be null");
        expect(body).not.toHaveProperty("user");
        done();
      });
  });

  test(`400 Registration failed - response should have errors property if email is already used`, (done) => {
    request(app)
      .post("/register")
      .send({ email: "johndoe@gmail.com", name: "John", password: "testing" })
      .then((response) => {
        const { body } = response;

        expect(body).toHaveProperty("code");
        expect(body.code).toBe(400);
        expect(body).toHaveProperty("status");
        expect(body.status).toBe("fail");
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("Registration failed");
        expect(body).toHaveProperty("errors");
        expect(body.errors).toEqual(expect.any(Array));
        const errorEmail = body.errors[0];
        expect(errorEmail).toBe("Email is already exists");
        expect(body).not.toHaveProperty("user");
        done();
      });
  });

  test(`400 Registration failed - response should have errors property if name is null`, (done) => {
    request(app)
      .post("/register")
      .send({ email: "testing@gmail.com", name: null, password: "testing" })
      .then((response) => {
        const { body } = response;

        expect(body).toHaveProperty("code");
        expect(body.code).toBe(400);
        expect(body).toHaveProperty("status");
        expect(body.status).toBe("fail");
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("Registration failed");
        expect(body).toHaveProperty("errors");
        expect(body.errors).toEqual(expect.any(Array));
        const errorName = body.errors[0];
        expect(errorName).toBe("Name cannot be null");
        expect(body).not.toHaveProperty("user");
        done();
      });
  });

  test(`400 Registration failed - response should have errors property if name is empty`, (done) => {
    request(app)
      .post("/register")
      .send({ email: "testing@gmail.com", name: "", password: "testing" })
      .then((response) => {
        const { body } = response;

        expect(body).toHaveProperty("code");
        expect(body.code).toBe(400);
        expect(body).toHaveProperty("status");
        expect(body.status).toBe("fail");
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("Registration failed");
        expect(body).toHaveProperty("errors");
        expect(body.errors).toEqual(expect.any(Array));
        const errorName = body.errors[0];
        expect(errorName).toBe("Name is required");
        expect(body).not.toHaveProperty("user");
        done();
      });
  });

  test(`400 Registration failed - response should have errors property if password is null`, (done) => {
    request(app)
      .post("/register")
      .send({
        email: "testingpassword@gmail.com",
        name: "John",
        password: null,
      })
      .then((response) => {
        const { body } = response;

        expect(body).toHaveProperty("code");
        expect(body.code).toBe(400);
        expect(body).toHaveProperty("status");
        expect(body.status).toBe("fail");
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("Registration failed");
        expect(body).toHaveProperty("errors");
        expect(body.errors).toEqual(expect.any(Array));
        const errorPassword = body.errors[0];
        expect(errorPassword).toBe("Password cannot be null");
        expect(body).not.toHaveProperty("user");
        done();
      });
  });

  test(`400 Registration failed - response should have errors property if password is empty`, (done) => {
    request(app)
      .post("/register")
      .send({ email: "testingpassword@gmail.com", name: "John", password: "" })
      .then((response) => {
        const { body } = response;

        expect(body).toHaveProperty("code");
        expect(body.code).toBe(400);
        expect(body).toHaveProperty("status");
        expect(body.status).toBe("fail");
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("Registration failed");
        expect(body).toHaveProperty("errors");
        expect(body.errors).toEqual(expect.any(Array));
        const errorPassword = body.errors[0];
        expect(errorPassword).toBe("Password is required");
        expect(body).not.toHaveProperty("user");
        done();
      });
  });

  test(`400 Registration failed - response should have errors property if password length is too short!`, (done) => {
    request(app)
      .post("/register")
      .send({
        email: "testingpassword@gmail.com",
        name: "John",
        password: "tes",
      })
      .then((response) => {
        const { body } = response;

        expect(body).toHaveProperty("code");
        expect(body.code).toBe(400);
        expect(body).toHaveProperty("status");
        expect(body.status).toBe("fail");
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("Registration failed");
        expect(body).toHaveProperty("errors");
        expect(body.errors).toEqual(expect.any(Array));
        const errorPassword = body.errors[0];
        expect(errorPassword).toBe(
          "Your password is too short! You need 5+ characters"
        );
        expect(body).not.toHaveProperty("user");
        done();
      });
  });
});

describe("POST /login - (user login test)", () => {
  const registerPayload = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    password: "johndoe",
  };

  beforeAll((done) => {
    request(app)
      .post("/register")
      .send(registerPayload)
      .then((response) => {
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

  test(`(200 - login successful) - response should have the correct property and value`, (done) => {
    request(app)
      .post("/login")
      .send({
        email: registerPayload.email,
        password: registerPayload.password,
      })
      .then((response) => {
        const { body } = response;
        expect(body).toHaveProperty("code");
        expect(body.code).toBe(200);
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("Login successful");
        expect(body).toHaveProperty("status");
        expect(body.status).toBe("success");
        expect(body).toHaveProperty("access_token");
        expect(body.access_token).toEqual(expect.any(String));
        done();
      });
  });

  test(`(401 - Login failed) - response should have the errors property and value if email is wrong or not found in database`, (done) => {
    request(app)
      .post("/login")
      .send({
        email: "wrong@gmail.com",
        password: registerPayload.password,
      })
      .then((response) => {
        const { body } = response;
        expect(body).toHaveProperty("code");
        expect(body.code).toBe(401);
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("Login failed");
        expect(body).toHaveProperty("status");
        expect(body.status).toBe("fail");
        expect(body).not.toHaveProperty("access_token");
        expect(body).toHaveProperty("errors");
        expect(body.errors).toEqual(expect.any(Array));
        const errorMessage = body.errors[0];
        expect(errorMessage).toEqual("The email or password are incorrect");
        done();
      });
  });

  test(`(401 - Login failed) - response should have the errors property and value if password is not match`, (done) => {
    request(app)
      .post("/login")
      .send({
        email: registerPayload.email,
        password: "wrongpassword",
      })
      .then((response) => {
        const { body } = response;
        expect(body).toHaveProperty("code");
        expect(body.code).toBe(401);
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("Login failed");
        expect(body).toHaveProperty("status");
        expect(body.status).toBe("fail");
        expect(body).not.toHaveProperty("access_token");
        expect(body).toHaveProperty("errors");
        expect(body.errors).toEqual(expect.any(Array));
        const errorMessage = body.errors[0];
        expect(errorMessage).toEqual("The email or password are incorrect");
        done();
      });
  });
});
