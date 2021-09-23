# Remempay

An application to find jobs provided by hundreds of thousands of companies. This app inclides:

1. RESTful endpoint for asset's CRUD operation
2. JSON formatted Response

## endpoints

- POST /login
- POST /register
- GET /list
- GET /list/status
- GET /list/info
- GET /list/:id
- POST /list
- POST /list/balance
- POST /list/convert
- PUT /list/:id
- DELETE /list/:id

### POST /login

-user login

_Request Header_

```
not needed
```

_Request Params_

```
not needed
```

_Request Body_

```
username: req.body.username,
password: req.body.password
```

_Response (200 - OK)_

```
{
  "code": 200,
  "message": "Success Login",
  "username": "testing",
  "email": "testing@mail.com",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0aW5nIiwiZW1haWwiOiJ0ZXN0aW5nQG1haWwuY29tIiwiaWF0IjoxNjMyNDE0MzYzfQ.Wskhy47v_AsW4u9dOWO4zw3NrMi2sRH4C94t8Ih5Zx0"
}
```

_Response (401)_

```
{
  "message": "Wrong username / password"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

### POST /register

-user register

_Request Header_

```
not needed
```

_Request Params_

```
not needed
```

_Request Body_

```
username: req.body.username,
password: req.body.password,
email: req.body.email,
name: req.body.name
```

_Response (201 - Created)_

```
{
  "code": 201,
  "message": "Success create account",
  "id": 7,
  "username": "testing333",
  "email": "testing333@mail.com",
  "name": "pembayar",
  "balance": 0
}
```

_Response (400 - Bad Request)_

```
{
  "message": [
    "PLEASE INSERT USERNAME",
    "PLEASE INSERT EMAIL",
    "PLEASE INSERT NAME",
    "PLEASE INSERT PASSWORD"
  ]
}
OR
{
  "message": [
    "USERNAME MUST BE UNIQUE",
    "EMAIL MUST BE UNIQUE",
    "PLEASE INSERT NAME",
    "PLEASE INSERT PASSWORD"
  ]
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

### GET /list

-get list of reminders

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Params_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
{
  "message": "Succeded in getting all reminder",
  "reminder": [
    {
      "id": 2,
      "userId": 1,
      "receiverId": 2,
      "amount": 200000,
      "paid": 100000,
      "description": "Bayar pulsa",
      "deadline": "2021-09-30T00:00:00.000Z",
      "status": "active",
      "createdAt": "2021-09-22T18:22:05.856Z",
      "updatedAt": "2021-09-22T19:31:27.041Z",
      "receiver": {
        "name": "penerima"
      }
    },
    {
      "id": 5,
      "userId": 1,
      "receiverId": 2,
      "amount": 1000000,
      "paid": 0,
      "description": "bayar reparasi tv 5",
      "deadline": "2021-09-24T17:00:00.000Z",
      "status": "active",
      "createdAt": "2021-09-23T03:58:39.869Z",
      "updatedAt": "2021-09-23T03:58:39.869Z",
      "receiver": {
        "name": "penerima"
      }
    },
    {
      "id": 4,
      "userId": 1,
      "receiverId": 2,
      "amount": 1000000,
      "paid": 600000,
      "description": "bayar reparasi tv 5",
      "deadline": "2021-09-24T17:00:00.000Z",
      "status": "active",
      "createdAt": "2021-09-23T03:58:08.596Z",
      "updatedAt": "2021-09-23T04:06:56.209Z",
      "receiver": {
        "name": "penerima"
      }
    }
  ]
}
```

_Response (401 - Unauthorized)_

```
{
  "message: "Please login first!"
}
```

_Response (404 - Not Found)_

```
{
  "message: "Invalid Token"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

### GET /list/status

-get list of payment statuses

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Params_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
{
  "message": "Succeded in getting all payment status",
  "status": [
    {
      "id": 2,
      "userId": 1,
      "receiverId": 2,
      "amount": 200000,
      "paid": 100000,
      "description": "Bayar pulsa",
      "deadline": "2021-09-30T00:00:00.000Z",
      "status": "active",
      "createdAt": "2021-09-22T18:22:05.856Z",
      "updatedAt": "2021-09-22T19:31:27.041Z",
      "payer": {
        "name": "pembayar"
      }
    },
    {
      "id": 5,
      "userId": 1,
      "receiverId": 2,
      "amount": 1000000,
      "paid": 0,
      "description": "bayar reparasi tv 5",
      "deadline": "2021-09-24T17:00:00.000Z",
      "status": "active",
      "createdAt": "2021-09-23T03:58:39.869Z",
      "updatedAt": "2021-09-23T03:58:39.869Z",
      "payer": {
        "name": "pembayar"
      }
    },
    {
      "id": 6,
      "userId": 5,
      "receiverId": 2,
      "amount": 1000000,
      "paid": 0,
      "description": "bayar pulsa",
      "deadline": "2021-09-24T17:00:00.000Z",
      "status": "active",
      "createdAt": "2021-09-23T04:06:38.723Z",
      "updatedAt": "2021-09-23T04:06:38.723Z",
      "payer": {
        "name": "Jonathan"
      }
    },
    {
      "id": 4,
      "userId": 1,
      "receiverId": 2,
      "amount": 1000000,
      "paid": 600000,
      "description": "bayar reparasi tv 5",
      "deadline": "2021-09-24T17:00:00.000Z",
      "status": "active",
      "createdAt": "2021-09-23T03:58:08.596Z",
      "updatedAt": "2021-09-23T04:06:56.209Z",
      "payer": {
        "name": "pembayar"
      }
    }
  ]
}
```

_Response (401 - Unauthorized)_

```
{
  "message: "Please login first!"
}
```

_Response (404 - Not Found)_

```
{
  "message: "Invalid Token"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

### GET /list/info

-get logged in user info

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Login_

```
id: req.login.id
```

_Request Params_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
{
  "info": {
    "name": "penerima",
    "balance": 1400000
  }
}
```

_Response (401 - Unauthorized)_

```
{
  "message: "Please login first!"
}
```

_Response (404 - Not Found)_

```
{
  "message: "Invalid Token"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

### POST /list/

-post a new reminder

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Login_

```
userId: req.login.id
```

_Request Params_

```
not needed
```

_Request Body_

```
receiverId: req.body.receiverId,
amount: req.body.amount,
description: req.body.description,
deadline: new Date(req.body.deadline),
```

_Response (201 - Created)_

```
{
  "message": "Success",
  "receiverId": 2,
  "amount": 1000000,
  "description": "bayar pulsa",
  "deadline": "25th September 2021",
  "paid": 0,
  "status": "active"
}
```

_Response (400 - Bad Request)_

```
{
  "message": "You cannot request payment from yourself!"
}
```

_Response (401 - Unauthorized)_

```
{
  "message: "Please login first!"
}
```

_Response (404 - Not Found)_

```
{
  "message: "Invalid Token"
}
OR
{
  "message: "No user with id ${req.body.receiverId} found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

### POST /list/balance

-post a new balance

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Login_

```
id: req.login.id
```

_Request Params_

```
not needed
```

_Request Body_

```
amount: req.body.amount,
```

_Response (200 - OK)_

```
{
  "message": "balance added"
}
```

_Response (401 - Unauthorized)_

```
{
  "message: "Please login first!"
}
```

_Response (404 - Not Found)_

```
{
  "message: "Invalid Token"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

### PUT /list/:id

-put amount of money to pay

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Login_

```
userId: req.login.id
```

_Request Params_

```
paymentId: req.params.id
```

_Request Body_

```
amount: req.body.amount,
```

_Response (200 - OK)_

```
{
  "message": "Payment success, remaining amount: 300000"
}
OR
{
  "message": "Payment success"
}
```

_Response (400 - Bad Request)_

```
{
  "message: "Payment status has been paid off!"
}
OR
{
  "message: "You have insufficient balance"
}
```

_Response (401 - Unauthorized)_

```
{
  "message: "Please login first!"
}
```

_Response (403 - Forbidden)_

```
{
  "message": "You cannot pay for yourself"
}
```

_Response (404 - Not Found)_

```
{
  "message: "Invalid Token"
}
OR
{
  "message": "Payment reminder with id ${req.params.id} not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

### POST /list/convert

-convert a currency

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Login_

```
not needed
```

_Request Params_

```
not needed
```

_Request Body_

```
currencyFrom: req.body.currencyFrom,
currencyTo: req.body.currencyTo
amount: req.body.amount,
```

_Response (200 - OK)_

```
49.14
```

_Response (401 - Unauthorized)_

```
{
  "message: "Please login first!"
}
```

_Response (404 - Not Found)_

```
{
  "message: "Invalid Token"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

### DELETE /list/:id

-delete a reminder

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Login_

```
not needed
```

_Request Params_

```
id: req.params.id
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
{
  "message: "Payment reminder deleted"
}
```

_Response (401 - Unauthorized)_

```
{
  "message: "Please login first!"
}
```

_Response (403 - Forbidden)_

```
{
  "message": "You are not authorized to do this action"
}
```

_Response (404 - Not Found)_

```
{
  "message: "Invalid Token"
}
OR
{
  "message": "Payment reminder with id ${req.params.id} not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

### GET /list/:id

-get a particular reminder with id

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Login_

```
not needed
```

_Request Params_

```
id: req.params.id
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
{
  "id": 2,
  "userId": 1,
  "receiverId": 2,
  "amount": 200000,
  "paid": 100000,
  "description": "Bayar pulsa",
  "deadline": "2021-09-30T00:00:00.000Z",
  "status": "active",
  "createdAt": "2021-09-22T18:22:05.856Z",
  "updatedAt": "2021-09-22T19:31:27.041Z"
}
```

_Response (401 - Unauthorized)_

```
{
  "message: "Please login first!"
}
```

_Response (404 - Not Found)_

```
{
  "message: "Invalid Token"
}
OR
{
  "message": "reminder with id ${req.params.id} not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```
