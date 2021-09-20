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
