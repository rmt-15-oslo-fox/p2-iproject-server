# Individual Project Server

Base URL: http://localhost:300

## List of available RESTful endpoints

### `POST /register`

#### _Request Header_

> not needed

#### _Request Body_

```JSON
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

#### _Respone (201 - Created)_

```JSON
{
  "code": 201,
  "status": "success",
  "message": "Registration successful",
  "user": {
    "email": "string"
  }
}
```

#### _Response(400 - Bad Request)_

```JSON
{
  "code": 400,
  "status": "fail",
  "message": "Registration failed",
  "errors": ["<error message>", "<error message>"]
}
```

#### _Response (500 - Internal Server Error)_

```JSON
{
  "status": 500,
  "status": "fail",
  "message": "Registration failed",
  "errors": [
    "Internal Server Error"
  ]
}
```

### `POST /login`

#### _Request Headers_

> not needed

#### _Request Body_

```JSON
{
  "email": "string",
  "password": "string
}
```

#### _Response (200)_

```JSON
{
  "code": 200,
  "status": "success",
  "message": "Login successful",
  "access_token": "<jwt token>",
  "user": {
    "id": "number",
    "email": "string",
    "avatar_url": "string",
    "name": "string"
  }
}
```

### _Response (401)_

```JSON
{
  "code": 401,
  "status": "fail",
  "message": "Login failed",
  "errors": [
    "The email or password are incorrect"
  ]
}
```

### _Response (500)_

```JSON
{
  "code": 500,
  "status": "fail",
  "message": "Login failed",
  "errors": [
    "Internal Server Error"
  ]
}
```
