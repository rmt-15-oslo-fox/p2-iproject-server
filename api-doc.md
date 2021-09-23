## Rest API COVID-APP-21

- Base URL
```
    http://localhost:3000/

    https://covid-app-server-21.herokuapp.com/ --> Deployment
```

- Methods 
```
    GET | POST |
```

## Post/register

- Request Header 
```
    None
```

- Request Body 
```
    username : <string>,
    email : <string>,
    password : <string>,
    city : <string>
```

- Request Params
```
    None
```

### Response(201)
```
    <Empty>
```

### Response(400)
```
    msg : "Password is required"
```

### Response(500)
```
    msg : "Internal Server Error"
```

## Post/login

- Request Header 
```
    None
```

- Request Body 
```
    username : <string>,
    password : <string>,
```

- Request Params
```
    None
```

### Response(200)
```
    access_token : <string>
```

### Response(400)
```
    msg : "Username/Password are Wrong"
```

### Response(500)
```
    msg : "Internal Server Error"
```

## Get/getDataCovidIndo

- Request Header 
```
    None
```

- Request Body 
```
    None
```

- Request Params
```
    None
```

### Response(200)
```
{
  "jumlah_positif": 2720,
  "jumlah_meninggal": 149,
  "jumlah_sembuh": 5356,
  "jumlah_dirawat": -2785,
  "tanggal": "2021-09-22",
  "created": "2021-09-22 16:37:51"
}
```

### Response(500)
```
    msg : "Internal Server Error"
```

## Get/hospital/location

- Request Header 
```
    access_token : <string>
```

- Request Body 
```
    None
```

- Request Params
```
    None
```

### Response(200)
```
[
    {
        "id": 1,
        "name": "RSUD Madani Kota Palu",
        "pointX": "-0.789287",
        "pointY": "119.869477",
        "telephonNumber": "04514131446"
    },
    {
        "id": 2,
        "name": "RS Umum Daerah Undata Palu",
        "pointX": "-0.858404",
        "pointY": "119.885291",
        "telephonNumber": "04514131446"
    },
]
```

### Response(500)
```
    msg : "Internal Server Error"
```

## Get/province

- Request Header 
```
    access_token : <string>
```

- Request Body 
```
    None
```

- Request Params
```
    None
```

### Response(200)
```
{
    "dataHospital": [
        {
            "name": "RS UMUM DAERAH  DR. ZAINOEL ABIDIN",
            "address": "JL. TGK DAUD BEUREUEH, NO. 108 B. ACEH",
            "region": "KOTA BANDA ACEH, ACEH",
            "phone": "(0651) 34565",
            "province": "Aceh"
        },
        {
            "name": "RS UMUM DAERAH CUT MEUTIA KAB. ACEH UTARA",
            "address": "JL. BANDA ACEH-MEDAN KM.6 BUKET RATA LHOKSEUMAWE",
            "region": "KOTA LHOKSEUMAWE, ACEH",
            "phone": "(0645) 46334",
            "province": "Aceh"
        },
    ],
    "dataProvince": [
        {
            "attributes": {
                "FID": 11,
                "Kode_Provi": 31,
                "Provinsi": "DKI Jakarta",
                "Kasus_Posi": 406205,
                "Kasus_Semb": 393166,
                "Kasus_Meni": 6625
            }
        },
        {
            "attributes": {
                "FID": 12,
                "Kode_Provi": 32,
                "Provinsi": "Jawa Barat",
                "Kasus_Posi": 277553,
                "Kasus_Semb": 243650,
                "Kasus_Meni": 3678
            }
        },
    ]
}
```

### Response(500)
```
    msg : "Internal Server Error"
```