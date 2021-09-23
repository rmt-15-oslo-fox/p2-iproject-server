# p2-iproject-server
Individual Portfolio Server

# Tourist Help server app
Tourist Help App is an application that provide helpful information for tourists. This app has : 
* JSON formatted response

&nbsp;
## List Endpoints
- `POST /register`
- `POST /login`
- `GET /places`
- `GET /restaurants`
- `GET /hotels`
- `GET /attractions`
- `GET /covid`
- `GET /favourites`
- `POST /favourites`


## RESTful endpoints

### POST /register

> Create new user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "username": "<username>",
  "email": "<email>"
}
```

_Response (201 - Created)_
```
{
  "id": "<id>",
  "email": "<email>"
}
```

_Response (400 - Bad Request)_
```
[
    "<error message>"
]
```



### POST /login

> Login user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email>",
  "password": "<password>"
}
```

_Response (200 - access token)_
```
{
  "access_token": <access token>,
  "email": <email>
}
```

_Response (401 - Error Authentication)_
```
[
    "Email / Password incorrect"
]
```

### GET /places

> Get all places in certain city

_Request Header_
```
not needed
```

_Request Query_
```
{
    "page": <page number> (optional),
    "size": <data size> (optional),
    "search": <city name> (optional, default value is jakarta),
}
```

_Response (200)_
```
[
    {
        "result_type": "geos",
        "result_object": {
            "location_id": "294229",
            "name": "Jakarta",
            "latitude": "-6.202333",
            "longitude": "106.84238",
            "num_reviews": "353649",
            "timezone": "Asia/Jakarta",
            "location_string": "Jakarta, Jawa",
            "photo": {
                "images": {
                    "small": {
                        "width": "150",
                        "url": "https://media-cdn.tripadvisor.com/media/photo-l/14/10/2e/cb/jakarta.jpg",
                        "height": "150"
                    },
                    "thumbnail": {
                        "width": "50",
                        "url": "https://media-cdn.tripadvisor.com/media/photo-t/14/10/2e/cb/jakarta.jpg",
                        "height": "50"
                    },
                    "original": {
                        "width": "8000",
                        "url": "https://media-cdn.tripadvisor.com/media/photo-o/14/10/2e/cb/jakarta.jpg",
                        "height": "3125"
                    },
                    "large": {
                        "width": "550",
                        "url": "https://media-cdn.tripadvisor.com/media/photo-s/14/10/2e/cb/jakarta.jpg",
                        "height": "215"
                    },
                    "medium": {
                        "width": "250",
                        "url": "https://media-cdn.tripadvisor.com/media/photo-f/14/10/2e/cb/jakarta.jpg",
                        "height": "98"
                    }
                },
                "is_blessed": false,
                "uploaded_date": "2018-08-09T12:30:35-0400",
                "caption": "",
                "id": "336604875",
                "helpful_votes": "23",
                "published_date": "2018-08-09T12:30:35-0400",
                "user": null
            },
            "awards": [],
            "doubleclick_zone": "as.indonesia.java.jakarta",
            "preferred_map_engine": "default",
            "geo_type": "narrow",
            "category_counts": {
                "attractions": {
                    "activities": "424",
                    "attractions": "185",
                    "nightlife": "41",
                    "shopping": "151",
                    "total": "801"
                },
                "restaurants": {
                    "total": "9903"
                },
                "accommodations": {
                    "hotels": "1160",
                    "bbs_inns": "700",
                    "others": "498",
                    "total": "2358"
                },
                "neighborhoods": "17",
                "airports": "0"
            },
            "nearby_attractions": [],
            "description": "",
            "is_localized_description": false,
            "web_url": "",
            "ancestors": [
                {
                    "subcategory": [
                        {
                            "key": "region",
                            "name": "Wilayah"
                        }
                    ],
                    "name": "Jawa",
                    "abbrv": null,
                    "location_id": "294228"
                },
                {
                    "subcategory": [
                        {
                            "key": "country",
                            "name": "Negara"
                        }
                    ],
                    "name": "Indonesia",
                    "abbrv": null,
                    "location_id": "294225"
                }
            ],
            "category": {
                "key": "geographic",
                "name": "Geografis"
            },
            "subcategory": [
                {
                    "key": "city",
                    "name": "Kota"
                }
            ],
            "is_jfy_enabled": false,
            "nearest_metro_station": [],
            "geo_description": "Jakarta, ibu kota Indonesia yang ramai, padat, dan kosmopolitan ini, adalah kota yang penuh keanekaragaman. Penduduknya mencapai jutaan orang dari seluruh dunia. Berbagai macam bahasa, budaya, dan tingkat sosial ekonomi berbaur di dalamnya. Kota ini dikenal sebagai salah satu kota yang memiliki suasana malam terbaik di Asia dan kemacetan terparah. Setiap hari libur, warga setempat biasanya akan melarikan diri sejenak dari polusi dan kemacetan untuk menikmati beragam hiburan di Taman Impian Ancol, tempat wisata yang dilengkapi waterpark, pantai, lapangan golf, dan SeaWorld.",
            "has_restaurant_coverpage": false,
            "has_attraction_coverpage": false,
            "has_curated_shopping_list": false
        },
        "scope": "local",
        "is_top_result": true
    },
    ...
]
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error"
}
```

---

### GET /restaurants

> Get all restaurants in certain city

_Request Header_
```
not needed
```

_Request Query_
```
{
    "location_id": <location_id> (optional || get location_id from places search || default value is 294229),
    "page": <page number> (optional || default value is 1),
    "size": <data size> (optional || default value is 6)
}
```

_Response (200)_
```
[
    {
        "location_id": "13480851",
        "name": "KALTURE Progressive Cafe & Resto",
        "latitude": "-6.283457",
        "longitude": "106.80812",
        "num_reviews": "115",
        "timezone": "Asia/Jakarta",
        "location_string": "Jakarta, Java",
        "photo": {
            "images": {
                "small": {
                    "width": "150",
                    "url": "https://media-cdn.tripadvisor.com/media/photo-l/13/d8/30/31/hummus-platter.jpg",
                    "height": "150"
                },
                "thumbnail": {
                    "width": "50",
                    "url": "https://media-cdn.tripadvisor.com/media/photo-t/13/d8/30/31/hummus-platter.jpg",
                    "height": "50"
                },
                "original": {
                    "width": "1280",
                    "url": "https://media-cdn.tripadvisor.com/media/photo-m/1280/13/d8/30/31/hummus-platter.jpg",
                    "height": "853"
                },
                "large": {
                    "width": "1024",
                    "url": "https://media-cdn.tripadvisor.com/media/photo-w/13/d8/30/31/hummus-platter.jpg",
                    "height": "683"
                },
                "medium": {
                    "width": "550",
                    "url": "https://media-cdn.tripadvisor.com/media/photo-s/13/d8/30/31/hummus-platter.jpg",
                    "height": "367"
                }
            },
            "is_blessed": true,
            "uploaded_date": "2018-07-25T12:47:38-0400",
            "caption": "Hummus Platter",
            "id": "332935217",
            "helpful_votes": "0",
            "published_date": "2018-07-25T12:47:38-0400",
            "user": {
                "user_id": null,
                "member_id": "0",
                "type": "user"
            }
        },
        "awards": [
            {
                "award_type": "CERTIFICATE_OF_EXCELLENCE",
                "year": "2021",
                "images": {
                    "small": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_small-0-5.jpg",
                    "large": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_2021_en_US_large-0-5.jpg"
                },
                "categories": [],
                "display_name": "Certificate of Excellence 2021"
            },
            {
                "award_type": "CERTIFICATE_OF_EXCELLENCE",
                "year": "2020",
                "images": {
                    "small": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_small-0-5.jpg",
                    "large": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_2020_en_US_large-0-5.jpg"
                },
                "categories": [],
                "display_name": "Certificate of Excellence 2020"
            },
            {
                "award_type": "CERTIFICATE_OF_EXCELLENCE",
                "year": "2019",
                "images": {
                    "small": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_small-0-5.jpg",
                    "large": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_2019_en_US_large-0-5.jpg"
                },
                "categories": [],
                "display_name": "Certificate of Excellence 2019"
            }
        ],
        "doubleclick_zone": "as.indonesia.java.jakarta",
        "preferred_map_engine": "default",
        "raw_ranking": "4.629193305969238",
        "ranking_geo": "Jakarta",
        "ranking_geo_id": "294229",
        "ranking_position": "22",
        "ranking_denominator": "7430",
        "ranking_category": "restaurant",
        "ranking": "#22 of 8,966 Restaurants in Jakarta",
        "distance": null,
        "distance_string": null,
        "bearing": null,
        "rating": "5.0",
        "is_closed": false,
        "open_now_text": "Open Now",
        "is_long_closed": false,
        "price_level": "",
        "price": "$50,000 - $250,000",
        "neighborhood_info": [
            {
                "location_id": "20484395",
                "name": "Cilandak"
            }
        ],
        "description": "Holistic Home Food -a dynamic culinary fusion with home-style recipes. Multi Cuisine -Authentic and Fusion Indian, we offer select Italian, Japanese, Korean and Indonesian Cuisine, delicately fresh cooked to the international community of south Jakarta. We don't use MSG, Sugar or other oils except for Olive and Vegetable Oils. Food is mildly spicy, with many choices for non-spicy food. Families with kids welcome. Non Smoking.",
        "web_url": "https://www.tripadvisor.com/Restaurant_Review-g294229-d13480851-Reviews-KALTURE_Progressive_Cafe_Resto-Jakarta_Java.html",
        "write_review": "https://www.tripadvisor.com/UserReview-g294229-d13480851-KALTURE_Progressive_Cafe_Resto-Jakarta_Java.html",
        "ancestors": [
            {
                "subcategory": [
                    {
                        "key": "city",
                        "name": "City"
                    }
                ],
                "name": "Jakarta",
                "abbrv": null,
                "location_id": "294229"
            },
            {
                "subcategory": [
                    {
                        "key": "region",
                        "name": "Region"
                    }
                ],
                "name": "Java",
                "abbrv": null,
                "location_id": "294228"
            },
            {
                "subcategory": [
                    {
                        "key": "country",
                        "name": "Country"
                    }
                ],
                "name": "Indonesia",
                "abbrv": null,
                "location_id": "294225"
            }
        ],
        "category": {
            "key": "restaurant",
            "name": "Restaurant"
        },
        "subcategory": [
            {
                "key": "sit_down",
                "name": "Sit down"
            }
        ],
        "parent_display_name": "Jakarta",
        "is_jfy_enabled": false,
        "nearest_metro_station": [],
        "reviews": [
            {
                "id": "655108642",
                "lang": null,
                "location_id": "0",
                "published_date": "2021-09-23T00:28:43-04:00",
                "published_platform": "Desktop",
                "rating": "5",
                "type": "review",
                "helpful_votes": "0",
                "url": "https://www.tripadvisor.com/ShowUserReviews?src=655108642#review655108642",
                "travel_date": null,
                "text": null,
                "user": null,
                "title": "Fusion of indian food",
                "owner_response": null,
                "subratings": [],
                "machine_translated": false,
                "machine_translatable": false
            }
        ],
        "phone": "+62 21 22706042",
        "website": "http://web.facebook.com/GEETIKAsKALTURE/",
        "email": "kaltureep@gmail.com",
        "address_obj": {
            "street1": "Jl Pangeran Antasari",
            "street2": "Main Entrance Executive Paradise, Cilandak",
            "city": "Jakarta",
            "state": null,
            "country": "Indonesia",
            "postalcode": "12430"
        },
        "address": "Jl Pangeran Antasari Main Entrance Executive Paradise, Cilandak, Jakarta 12430 Indonesia",
        "hours": {
            "week_ranges": [
                [
                    {
                        "open_time": 660,
                        "close_time": 1260
                    }
                ],
                [],
                [
                    {
                        "open_time": 660,
                        "close_time": 1230
                    }
                ],
                [
                    {
                        "open_time": 660,
                        "close_time": 1230
                    }
                ],
                [
                    {
                        "open_time": 660,
                        "close_time": 1230
                    }
                ],
                [
                    {
                        "open_time": 660,
                        "close_time": 1230
                    }
                ],
                [
                    {
                        "open_time": 660,
                        "close_time": 1260
                    }
                ]
            ],
            "timezone": "Asia/Jakarta"
        },
        "is_candidate_for_contact_info_suppression": false,
        "cuisine": [],
        "dietary_restrictions": [],
        "booking": {
            "provider": "Chope.co",
            "url": "https://www.tripadvisor.com/Commerce?p=Restaurants_Chope&src=151768442&geo=13480851&from=api&area=reservation_button&slot=1&matchID=1&oos=0&cnt=1&silo=13539&bucket=485139&nrank=1&crank=1&clt=R&ttype=Restaurant&tm=212282923&managed=false&capped=false&gosox=2G39OwCtaobEl1sOYlGlULMgy70XepMCFLwvYHLkmqeeuev3FNMXaw-T0_oNJMD1NGi9I6nuBPmXmunT2F7Y2XpGVIaTEkeJ98oSYDkxHS8&cs=100920ad173d0dacc1f997eae0d5ebebe"
        },
        "reserve_info": {
            "id": "13480851",
            "provider": "Chope.co",
            "provider_img": "https://static.tacdn.com/img2/eateries/Chope_3.25.2019.png",
            "url": "https://www.tripadvisor.com/Commerce?p=Restaurants_Chope&src=151768442&geo=13480851&from=api&area=reservation_button&slot=1&matchID=1&oos=0&cnt=1&silo=13539&bucket=485139&nrank=1&crank=1&clt=R&ttype=Restaurant&tm=212282923&managed=false&capped=false&gosox=2G39OwCtaobEl1sOYlGlULMgy70XepMCFLwvYHLkmqeeuev3FNMXaw-T0_oNJMD1NGi9I6nuBPmXmunT2F7Y2XpGVIaTEkeJ98oSYDkxHS8&cs=100920ad173d0dacc1f997eae0d5ebebe",
            "booking_partner_id": null,
            "racable": false,
            "api_bookable": false,
            "timeslots": null,
            "bestoffer": null,
            "timeslot_offers": null,
            "button_text": "Reserve",
            "disclaimer_text": null,
            "banner_text": null
        },
        "establishment_types": [],
        "tripads_metadata": {
            "restaurants_request_guid": "3cf2edf4-7b79-4754-8a81-21f40c6d7ee7",
            "ad_slot": "TA/Android/R/List/0a",
            "tripads_selection_guid": "14449e54-7698-4be8-b886-8cb4504b2ba4",
            "payload_token": "iv3nwfAKnI43LvtDABQClfZokeWoSyml32QqGT1Amxh3eQIf_TehGvjyHBVQpp4BfK_6ZXGz3S16fB1TalUFhiZ4owJAcnqP_55fgp2tecoATc4ijWJCqtsXe0e-lF8fCQbNASFbt2SEMv44obp9aXJUse4Z-R9C1oYzjQCLRH5MwtbjX9QarvIqiA5tow",
            "location_id": "13480851",
            "tripads_id": "3692698",
            "sl_line_item_id": "4044848",
            "advertiser_id": "0"
        }
    },
    ...
]
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error"
}
```

---

### GET /hotels

> Get all hotels in certain city

_Request Header_
```
not needed
```

_Request Query_
```
{
    "location_id": <location_id> (optional || get location_id from places search || default value is 294229),
    "page": <page number> (optional || default value is 1),
    "size": <data size> (optional || default value is 6)
}
```

_Response (200)_
```
[
    {
        "location_id": "307124",
        "name": "The Sultan Hotel & Residence Jakarta",
        "latitude": "-6.218409",
        "longitude": "106.80904",
        "num_reviews": "1018",
        "timezone": "Asia/Jakarta",
        "location_string": "Jakarta, Java",
        "photo": {
            "images": {
                "small": {
                    "width": "150",
                    "url": "https://media-cdn.tripadvisor.com/media/photo-l/0f/3d/eb/a9/lagoon-lounge--v16080069.jpg",
                    "height": "150"
                },
                "thumbnail": {
                    "width": "50",
                    "url": "https://media-cdn.tripadvisor.com/media/photo-t/0f/3d/eb/a9/lagoon-lounge--v16080069.jpg",
                    "height": "50"
                },
                "original": {
                    "width": "2600",
                    "url": "https://media-cdn.tripadvisor.com/media/photo-o/0f/3d/eb/a9/lagoon-lounge--v16080069.jpg",
                    "height": "1733"
                },
                "large": {
                    "width": "550",
                    "url": "https://media-cdn.tripadvisor.com/media/photo-s/0f/3d/eb/a9/lagoon-lounge--v16080069.jpg",
                    "height": "450"
                },
                "medium": {
                    "width": "250",
                    "url": "https://media-cdn.tripadvisor.com/media/photo-f/0f/3d/eb/a9/lagoon-lounge--v16080069.jpg",
                    "height": "205"
                }
            },
            "is_blessed": true,
            "uploaded_date": "2016-12-08T07:21:45-0500",
            "caption": "Lagoon Lounge at The Sultan Hotel & Residence Jakarta",
            "id": "255716265",
            "helpful_votes": "1",
            "published_date": "2017-05-11T11:10:15-0400",
            "user": null
        },
        "awards": [
            {
                "award_type": "CERTIFICATE_OF_EXCELLENCE",
                "year": "2021",
                "images": {
                    "small": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_small-0-5.jpg",
                    "large": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_2021_en_US_large-0-5.jpg"
                },
                "categories": [],
                "display_name": "Certificate of Excellence 2021"
            },
            {
                "award_type": "CERTIFICATE_OF_EXCELLENCE",
                "year": "2020",
                "images": {
                    "small": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_small-0-5.jpg",
                    "large": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_2020_en_US_large-0-5.jpg"
                },
                "categories": [],
                "display_name": "Certificate of Excellence 2020"
            },
            {
                "award_type": "CERTIFICATE_OF_EXCELLENCE",
                "year": "2019",
                "images": {
                    "small": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_small-0-5.jpg",
                    "large": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_2019_en_US_large-0-5.jpg"
                },
                "categories": [],
                "display_name": "Certificate of Excellence 2019"
            }
        ],
        "preferred_map_engine": "default",
        "autobroaden_type": "category_integrated",
        "autobroaden_label": "Jakarta Places to Stay",
        "raw_ranking": "4.280508041381836",
        "ranking_geo": "Jakarta",
        "ranking_geo_id": "294229",
        "ranking_position": "1",
        "ranking_denominator": "2358",
        "ranking_category": "hotel",
        "ranking": "#1 Best Value of 2,358 places to stay in Jakarta",
        "subcategory_type": "hotel",
        "subcategory_type_label": "Hotel",
        "distance": "2.548077235877879",
        "distance_string": null,
        "bearing": "southwest",
        "rating": "4.0",
        "is_closed": false,
        "is_long_closed": false,
        "price_level": "$",
        "price": "$80 - $134",
        "neighborhood_info": [
            {
                "location_id": "21002075",
                "name": "Grogol Petamburan"
            },
            {
                "location_id": "21002083",
                "name": "Tanah Abang"
            }
        ],
        "hotel_class": "4.0",
        "hotel_class_attribution": "This property is classified according to Giata.",
        "business_listings": {
            "desktop_contacts": [],
            "mobile_contacts": []
        },
        "special_offers": {
            "desktop": [],
            "mobile": []
        },
        "listing_key": "386f51d2-1486-45d2-9744-d485c97c26bd"
    },
    ...
]
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error"
}
```

---

### GET /attractions

> Get all attractions in certain city

_Request Header_
```
not needed
```

_Request Query_
```
{
    "location_id": <location_id> (optional || get location_id from places search || default value is 294229),
    "page": <page number> (optional || default value is 1),
    "size": <data size> (optional || default value is 6)
}
```

_Response (200)_
```
[
    {
        "location_id": "3844449",
        "name": "Grand Indonesia Mall",
        "latitude": "-6.195035",
        "longitude": "106.820816",
        "num_reviews": "3234",
        "timezone": "Asia/Jakarta",
        "location_string": "Jakarta, Java",
        "photo": {
            "images": {
                "small": {
                    "width": "150",
                    "url": "https://media-cdn.tripadvisor.com/media/photo-l/03/7c/75/d9/grand-indonesia-mall.jpg",
                    "height": "150"
                },
                "thumbnail": {
                    "width": "50",
                    "url": "https://media-cdn.tripadvisor.com/media/photo-t/03/7c/75/d9/grand-indonesia-mall.jpg",
                    "height": "50"
                },
                "original": {
                    "width": "2000",
                    "url": "https://media-cdn.tripadvisor.com/media/photo-o/03/7c/75/d9/grand-indonesia-mall.jpg",
                    "height": "1493"
                },
                "large": {
                    "width": "550",
                    "url": "https://media-cdn.tripadvisor.com/media/photo-s/03/7c/75/d9/grand-indonesia-mall.jpg",
                    "height": "410"
                },
                "medium": {
                    "width": "250",
                    "url": "https://media-cdn.tripadvisor.com/media/photo-f/03/7c/75/d9/grand-indonesia-mall.jpg",
                    "height": "186"
                }
            },
            "is_blessed": true,
            "uploaded_date": "2013-02-15T06:02:36-0500",
            "caption": "                  world theme section\r\n                ",
            "id": "58488281",
            "helpful_votes": "39",
            "published_date": "2013-02-15T06:02:36-0500",
            "user": {
                "user_id": null,
                "member_id": "0",
                "type": "user"
            }
        },
        "awards": [
            {
                "award_type": "CERTIFICATE_OF_EXCELLENCE",
                "year": "2021",
                "images": {
                    "small": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_small-0-5.jpg",
                    "large": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_2021_en_US_large-0-5.jpg"
                },
                "categories": [],
                "display_name": "Certificate of Excellence 2021"
            },
            {
                "award_type": "CERTIFICATE_OF_EXCELLENCE",
                "year": "2020",
                "images": {
                    "small": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_small-0-5.jpg",
                    "large": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_2020_en_US_large-0-5.jpg"
                },
                "categories": [],
                "display_name": "Certificate of Excellence 2020"
            },
            {
                "award_type": "CERTIFICATE_OF_EXCELLENCE",
                "year": "2019",
                "images": {
                    "small": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_small-0-5.jpg",
                    "large": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_2019_en_US_large-0-5.jpg"
                },
                "categories": [],
                "display_name": "Certificate of Excellence 2019"
            },
            {
                "award_type": "CERTIFICATE_OF_EXCELLENCE",
                "year": "2018",
                "images": {
                    "small": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_small-0-5.jpg",
                    "large": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_2018_en_US_large-0-5.jpg"
                },
                "categories": [],
                "display_name": "Certificate of Excellence 2018"
            },
            {
                "award_type": "CERTIFICATE_OF_EXCELLENCE",
                "year": "2017",
                "images": {
                    "small": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_small-0-5.jpg",
                    "large": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_2017_en_US_large-0-5.jpg"
                },
                "categories": [],
                "display_name": "Certificate of Excellence 2017"
            },
            {
                "award_type": "CERTIFICATE_OF_EXCELLENCE",
                "year": "2016",
                "images": {
                    "small": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_small-0-5.jpg",
                    "large": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_2016_en_US_large-0-5.jpg"
                },
                "categories": [],
                "display_name": "Certificate of Excellence 2016"
            },
            {
                "award_type": "CERTIFICATE_OF_EXCELLENCE",
                "year": "2015",
                "images": {
                    "small": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_small-0-5.jpg",
                    "large": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_2015_en_US_large-0-5.jpg"
                },
                "categories": [],
                "display_name": "Certificate of Excellence 2015"
            }
        ],
        "location_subtype": "none",
        "doubleclick_zone": "as.indonesia.java.jakarta",
        "preferred_map_engine": "default",
        "raw_ranking": "4.025137424468994",
        "ranking_geo": "Jakarta",
        "ranking_geo_id": "294229",
        "ranking_position": "3",
        "ranking_denominator": "294",
        "ranking_category": "attraction",
        "ranking_subcategory": "#3 of 294 things to do in Jakarta",
        "subcategory_ranking": "#3 of 294 things to do in Jakarta",
        "ranking": "#3 of 294 things to do in Jakarta",
        "distance": null,
        "distance_string": null,
        "bearing": null,
        "rating": "4.5",
        "is_closed": false,
        "open_now_text": "Open Now",
        "is_long_closed": false,
        "description": "",
        "web_url": "https://www.tripadvisor.com/Attraction_Review-g294229-d3844449-Reviews-Grand_Indonesia_Mall-Jakarta_Java.html",
        "write_review": "https://www.tripadvisor.com/UserReview-g294229-d3844449-Grand_Indonesia_Mall-Jakarta_Java.html",
        "ancestors": [
            {
                "subcategory": [
                    {
                        "key": "city",
                        "name": "City"
                    }
                ],
                "name": "Jakarta",
                "abbrv": null,
                "location_id": "294229"
            },
            {
                "subcategory": [
                    {
                        "key": "region",
                        "name": "Region"
                    }
                ],
                "name": "Java",
                "abbrv": null,
                "location_id": "294228"
            },
            {
                "subcategory": [
                    {
                        "key": "country",
                        "name": "Country"
                    }
                ],
                "name": "Indonesia",
                "abbrv": null,
                "location_id": "294225"
            }
        ],
        "category": {
            "key": "attraction",
            "name": "Attraction"
        },
        "subcategory": [
            {
                "key": "26",
                "name": "Shopping"
            }
        ],
        "parent_display_name": "Jakarta",
        "is_jfy_enabled": false,
        "nearest_metro_station": [],
        "phone": "+62 21 23580001",
        "website": "http://www.grand-indonesia.com",
        "address_obj": {
            "street1": "Jl. M.H. Thamrin 1",
            "street2": "Central Jakarta",
            "city": "Jakarta",
            "state": null,
            "country": "Indonesia",
            "postalcode": "10110"
        },
        "address": "Jl. M.H. Thamrin 1 Central Jakarta, Jakarta 10110 Indonesia",
        "hours": {
            "week_ranges": [
                [
                    {
                        "open_time": 600,
                        "close_time": 1320
                    }
                ],
                [
                    {
                        "open_time": 600,
                        "close_time": 1320
                    }
                ],
                [
                    {
                        "open_time": 600,
                        "close_time": 1320
                    }
                ],
                [
                    {
                        "open_time": 600,
                        "close_time": 1320
                    }
                ],
                [
                    {
                        "open_time": 600,
                        "close_time": 1320
                    }
                ],
                [
                    {
                        "open_time": 600,
                        "close_time": 1320
                    }
                ],
                [
                    {
                        "open_time": 600,
                        "close_time": 1320
                    }
                ]
            ],
            "timezone": "Asia/Jakarta"
        },
        "is_candidate_for_contact_info_suppression": false,
        "subtype": [
            {
                "key": "143",
                "name": "Shopping Malls"
            }
        ],
        "booking": {
            "provider": "Viator",
            "url": "https://www.tripadvisor.com/Commerce?url=https%3A%2F%2Fwww.viator.com%2Ftours%2FJakarta%2FJakarta-Landmarks-Tour%2Fd4633-201388P9%3Feap%3Dmobile-app-11383%26aid%3Dtripenandr&partnerKey=1&urlKey=69a796eaa37063eb1&logme=true&uidparam=refid&attrc=true&Provider=Viator&area=TOP&slot=1&cnt=1&geo=3844449&clt=TM&from=api&nt=true"
        },
        "offer_group": {
            "lowest_price": "$0.78",
            "offer_list": [
                {
                    "url": "https://www.tripadvisor.com/Commerce?url=https%3A%2F%2Fwww.viator.com%2Ftours%2FJakarta%2FJakarta-Landmarks-Tour%2Fd4633-201388P9%3Feap%3Dmobile-app-11383%26aid%3Dtripenandr&partnerKey=1&urlKey=69a796eaa37063eb1&logme=true&uidparam=refid&attrc=true&Provider=Viator&area=viator_multi&slot=1&cnt=1&geo=3844449&clt=TM&from=api&nt=true",
                    "price": "$128.21",
                    "rounded_up_price": "$129",
                    "offer_type": "",
                    "title": "Jakarta Landmarks Tour",
                    "product_code": "201388P9",
                    "partner": "Viator",
                    "image_url": "https://media.tacdn.com/media/attractions-splice-spp-360x240/09/e2/e0/e2.jpg",
                    "description": null,
                    "primary_category": "Cultural Tours"
                },
                {
                    "url": "https://www.tripadvisor.com/Commerce?url=https%3A%2F%2Fwww.viator.com%2Ftours%2FJakarta%2FPrivate-Tour-Full-day-Jakarta-Shopping-and-Food-Culinary-Tour%2Fd4633-109628P22%3Feap%3Dmobile-app-11383%26aid%3Dtripenandr&partnerKey=1&urlKey=758d1d43beff70175&logme=true&uidparam=refid&attrc=true&Provider=Viator&area=viator_multi&slot=2&cnt=1&geo=3844449&clt=TM&from=api&nt=true",
                    "price": "$77.89",
                    "rounded_up_price": "$78",
                    "offer_type": "",
                    "title": "Jakarta City Tour : Shopping and Food Culinary Tour",
                    "product_code": "109628P22",
                    "partner": "Viator",
                    "image_url": "https://media.tacdn.com/media/attractions-splice-spp-360x240/07/1e/30/58.jpg",
                    "description": null,
                    "primary_category": "Shopping Tours"
                }
            ],
            "has_see_all_url": true,
            "is_eligible_for_ap_list": true
        }
    },
    ...
]
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error"
}
```

---

### GET /covid

> Get covid19 data in certain country

_Request Header_
```
not needed
```

_Request Query_
```
{
    "country": <country name> (required)
}
```

_Response (200)_
```
{
    "country": "Italy",
    "code": "IT",
    "confirmed": 12134286,
    "recovered": 4408806,
    "critical": 513,
    "deaths": 754169,
    "latitude": 41.87194,
    "longitude": 12.56738,
    "lastChange": "2021-09-22T17:39:02+02:00",
    "lastUpdate": "2021-09-23T06:30:03+02:00"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error"
}
```

---
