# Nanjak Yuk App Server

My Assets App is an application to manage your assets. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints

&nbsp;

### 1. GET /mountains

> Get all mountains

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": 1,
        "name": "Semeru",
        "height": 3676,
        "status": true,
        "lokasi": "Kabupaten Malang dan Kabupaten Lumajang, Jawa Timur, Indonesia",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/12/Semeru.jpg",
        "createdAt": "2021-09-23T00:26:43.540Z",
        "updatedAt": "2021-09-23T00:26:43.540Z",
        "Tracks": [
            {
                "id": 1,
                "name": "Ranu Pani",
                "distance": 10,
                "tracking_time": 15,
                "location": "Malang",
                "transport": "Naik bis dari stasiun a ke b",
                "jumlahPos": 10,
                "MountId": 1,
                "createdAt": "2021-09-23T00:26:43.550Z",
                "updatedAt": "2021-09-23T00:26:43.550Z"
            },...
        ]
    },...
]
```

_Response (400 - Token Invalid)_
```
{
  "message": 'Authentication failed'
}
```
---

### 2. GET /alltrip

> Get all trip open

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": 7,
        "MountId": 2,
        "TrackId": 4,
        "start_date": "2021-09-28",
        "end_date": "2021-10-02",
        "status": true,
        "createdAt": "2021-09-23T01:23:00.100Z",
        "updatedAt": "2021-09-23T01:23:00.100Z",
        "Mountain": {
            "id": 2,
            "name": "Rinjani",
            "height": 3726,
            "status": true,
            "lokasi": "Lombok, Indonesia",
            "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Segara_Anak_Lake_Mt_Barujari.JPG/300px-Segara_Anak_Lake_Mt_Barujari.JPG",
            "createdAt": "2021-09-23T00:26:43.540Z",
            "updatedAt": "2021-09-23T00:26:43.540Z"
        },
        "Track": {
            "id": 4,
            "name": "Sembalun",
            "distance": 10,
            "tracking_time": 15,
            "location": "Lombok",
            "transport": "Naik bis dari stasiun a ke b",
            "jumlahPos": 10,
            "MountId": 2,
            "createdAt": "2021-09-23T00:26:43.550Z",
            "updatedAt": "2021-09-23T00:26:43.550Z"
        },
        "Users": [
            {
                "id": 1,
                "name": "Dabob Syaikh",
                "email": "dabob.syekh@gmail.com",
                "GroupTrips": {
                    "createdAt": "2021-09-23T01:23:00.107Z",
                    "updatedAt": "2021-09-23T01:23:00.107Z",
                    "TripId": 7,
                    "UserId": 1
                }
            }
        ]
    },..
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": 'internal server error'
}
```
---
### 3. POST /addtrip

> Create new Trip

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "MountId": <integer>,
    "TrackId": <integer>, 
    "start_date": <date>, 
    "end_date: <date"
}
```

_Response (201 - created)_
```
{
    "id": 8,
    "MountId": 2,
    "TrackId": 4,
    "start_date": "2021-10-10",
    "end_date": "2021-10-10",
    "updatedAt": "2021-09-23T06:01:24.015Z",
    "createdAt": "2021-09-23T06:01:24.015Z",
    "status": true
}
```
_Response (400 - Bad Request)_
```
{
  "message": [
    "Trip.MountId cannot be null",
    "Trip.TrackId cannot be null"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": <Server Error Message>
}
```
---
### 4. GET /mytrip

> Find Trip By UserLogin

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
id: <integer>
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "id": 1,
    "name": "Dabob Syaikh",
    "email": "dabob.syekh@gmail.com",
    "Trips": [
        {
            "id": 7,
            "MountId": 2,
            "TrackId": 4,
            "start_date": "2021-09-28",
            "end_date": "2021-10-02",
            "status": true,
            "createdAt": "2021-09-23T01:23:00.100Z",
            "updatedAt": "2021-09-23T01:23:00.100Z",
            "GroupTrips": {
                "createdAt": "2021-09-23T01:23:00.107Z",
                "updatedAt": "2021-09-23T01:23:00.107Z",
                "TripId": 7,
                "UserId": 1
            },
            "Mountain": {
                "id": 2,
                "name": "Rinjani",
                "height": 3726,
                "status": true,
                "lokasi": "Lombok, Indonesia",
                "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Segara_Anak_Lake_Mt_Barujari.JPG/300px-Segara_Anak_Lake_Mt_Barujari.JPG",
                "createdAt": "2021-09-23T00:26:43.540Z",
                "updatedAt": "2021-09-23T00:26:43.540Z"
            },
            "Track": {
                "id": 4,
                "name": "Sembalun",
                "distance": 10,
                "tracking_time": 15,
                "location": "Lombok",
                "transport": "Naik bis dari stasiun a ke b",
                "jumlahPos": 10,
                "MountId": 2,
                "createdAt": "2021-09-23T00:26:43.550Z",
                "updatedAt": "2021-09-23T00:26:43.550Z"
            },
            "Users": [
                {
                    "id": 1,
                    "name": "Dabob Syaikh",
                    "email": "dabob.syekh@gmail.com",
                    "GroupTrips": {
                        "createdAt": "2021-09-23T01:23:00.107Z",
                        "updatedAt": "2021-09-23T01:23:00.107Z",
                        "TripId": 7,
                        "UserId": 1
                    }
                },..
            ]
        },
    ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": <Server Error Message>
}
```
---
### 5. POST /jointrip

> Join with available trip

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "TripId": <integer>,
}
```

_Response (200)_
```
{
    "id": 10,
    "TripId": 7,
    "UserId": 1,
    "updatedAt": "2021-09-23T06:07:51.644Z",
    "createdAt": "2021-09-23T06:07:51.644Z"
}
```

_Response (404 - not found)_
```
{
    "message": "Wrong Mountain Id / Track Id"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": <Server Error Message>
}
```

### 6. DELETE /deleteTrip/:TripId'

> Delete Trip

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
TripId: <integer>
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "message": "Trip was deleted"
}
```
_Response (404 - not found)_
```
{
    "message": "Trip Id Not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": <Server Error Message>
}
```
---

### 7. GET /weather

> Get Weather

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
location: <string>
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "day": "Kamis",
        "fullDate": "23 Sep 2021",
        "temp": "33.05",
        "cuaca": "hujan rintik-rintik"
    },
    {
        "day": "Jumat",
        "fullDate": "24 Sep 2021",
        "temp": "32.65",
        "cuaca": "hujan sedang"
    },
    {
        "day": "Sabtu",
        "fullDate": "25 Sep 2021",
        "temp": "31.80",
        "cuaca": "hujan rintik-rintik"
    },
    {
        "day": "Minggu",
        "fullDate": "26 Sep 2021",
        "temp": "31.47",
        "cuaca": "hujan rintik-rintik"
    },
    {
        "day": "Senin",
        "fullDate": "27 Sep 2021",
        "temp": "31.35",
        "cuaca": "hujan sedang"
    },
    {
        "day": "Selasa",
        "fullDate": "28 Sep 2021",
        "temp": "29.97",
        "cuaca": "hujan rintik-rintik"
    },
    {
        "day": "Rabu",
        "fullDate": "29 Sep 2021",
        "temp": "30.58",
        "cuaca": "hujan rintik-rintik"
    },
    {
        "day": "Kamis",
        "fullDate": "30 Sep 2021",
        "temp": "30.97",
        "cuaca": "hujan rintik-rintik"
    }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": <Server Error Message>
}
```
---
### 8. POST /equipment'

> Post Equipment

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
TripId: <integer>, 
list: <array of string name item>
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "message": 'Success add equipment'
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": <Server Error Message>
}
```
---

### 9. GET /equipment/:tripid

> Find Equipment for group trip

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
TripId: <integer>
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": 2,
        "name": "tenda_2",
        "jumlah": 1,
        "TripId": 7,
        "EquipmentUsers": []
    },...
]
```
_Response (200 - Equipment not exist)_
```
[]
```

_Response (500 - Internal Server Error)_
```
{
  "message": <Server Error Message>
}
```
---

### 10. POST /equipmentuser

> Increment Equipment Responsibility

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
EquipmentId: <integer>, 
UserId: <integer>
```

_Response (200)_
```
{
    message: 'success'
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": <Server Error Message>
}
```
---
### 11. DELETE /equipmentuser

> Decrement Equipment Responsibility

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
EquipmentId: <integer>, 
UserId: <integer>
```

_Response (200)_
```
{
    message: 'success'
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": <Server Error Message>
}
```
---

### 12. DELETE /equipment

> Mark Equipment Responsibility

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
EquipmentId: <integer>, 
```

_Response (200)_
```
{
    message: 'success deleted'
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": <Server Error Message>
}
```
---