# p2-iproject-server
Individual Portfolio Server

# User Routes

## Register User

* URL
    > /users/register
* Method
    > Post
* Url Params
    > None
* Request Header
    > None
* Success Response (201)
    ```json
    {
        "id": "<your id>",
        "email": "<your email>" 
    }
    ```

## Login User
* URL
    > /users/login
* Method
    > Post
* Url Params
    > None
* Request Header
    > None
* Success Response (200)
    ```json
    {
        "userId": "<your id>",
        "email": "<your email>" ,
        "username": "<your username>",
        "access_token": "<your access token>"
    }
    ```
* Error Response (401)
    ```json
    {
        "message": "Error invalid username or email or password"
    }
    ```

# Product Routes

## List Product
* URL
    > /products
* Method
    > Get
* Url Params
    > country, lang, currentPage, pagesize, categories, concepts
* Request Header
    > x-rapidapi-host, x-rapidapi-key
* Success Response (200)
    ```json
    {
        "results": [
            {
            "code": "0714032_group_023",
            "name": "Suit trousers Skinny Fit",
            "stock": {
                "stockLevel": 1
            },
            "price": {
                "currencyIso": "SGD",
                "value": 49.95,
                "priceType": "BUY",
                "formattedValue": "S$ 49.95",
                "type": "WHITE"
            },
            "images": [...],
            "categories": [],
            "pk": "9069482115073",
            "whitePrice": {
                "currencyIso": "SGD",
                "value": 49.95,
                "priceType": "BUY",
                "formattedValue": "S$ 49.95",
                "type": "WHITE"
            },
            "articles": [...],
            "markers": [...],
            "visible": false,
            "concept": [
                "H&M MAN"
            ],
            "numbersOfPieces": 0,
            "defaultArticle": {
                "code": "0714032023",
                "name": "Suit trousers Skinny Fit",
                "images": [...],
                "pk": "9061640404993",
                "whitePrice": {
                    "currencyIso": "SGD",
                    "value": 49.95,
                    "priceType": "BUY",
                    "formattedValue": "S$ 49.95",
                    "type": "WHITE"
                },
                "logoPicture": [...],
                "normalPicture": [...],
                "markers": [...],
                "visible": false,
                "numbersOfPieces": 0,
                "ticket": "Oy9wbHAvcHJvZHVjdC1saXN0LXdpdGgtY291bnQvcHJvZHVjdC1saXN0OyM7cHJvZHVjdF9rZXk7MDcxNDAzMl9ncm91cF8wMjNfZW5fYXNpYTI7MDcxNDAzMjAyM19lbl9hc2lhMjtPQkpFQ1RJVkUkO05PTkU6Tk9ORTszMjs",
                "dummy": false,
                "ecoTaxValue": 0.0,
                "redirectToPdp": false,
                "comingSoon": false,
                "color": {
                    "code": "0000FF",
                    "text": "Dark blue",
                    "filterName": "Blue_0000FF",
                    "hybrisCode": "76"
                },
                "rgbColor": "#454553",
                "environmentalMarkers": [
                    "Conscious"
                ]
            },
            "sale": false,
            "variantSizes": [...],
            "swatches": [],
            "articleCodes": [...],
            "ticket": "Oy9wbHAvcHJvZHVjdC1saXN0LXdpdGgtY291bnQvcHJvZHVjdC1saXN0OyM7cHJvZHVjdF9rZXk7MDcxNDAzMl9ncm91cF8wMjNfZW5fYXNpYTI7MDcxNDAzMjAyM19lbl9hc2lhMjtPQkpFQ1RJVkUkO05PTkU6Tk9ORTszMjs",
            "searchEngineProductId": "0714032_group_023_en_asia2",
            "dummy": false,
            "linkPdp": "/en_asia2/productpage.0714032023.html",
            "categoryName": "Men",
            "rgbColors": [...],
            "articleColorNames": [...],
            "ecoTaxValue": 0.0,
            "swatchesTotal": 10,
            "showPriceMarker": false,
            "redirectToPdp": false,
            "mainCategoryCode": "men_trousers_trousers_skinny_all",
            "comingSoon": false
        }
        ]
    }
    ```

## Details Product
* URL
    > /products/:code
* Method
    > Get
* Url Params
    > code
* Request Header
    > x-rapidapi-host, x-rapidapi-key
* Success Response (200)
    ```json
    {
        "responseStatusCode":"ok",
        "product":{...}37 items
    }
    ```

# Wishlist Routes

## Add To Wishlist
* URL
    > /wishlists/add
* Method
    > Post
* Url Params
    > None
* Request Body
    > name, price, imageUrl, color, code
* Success Response (201)
    ```json
    {
        "name": "<name>",
        "price": "<price>",
        "imageUrl": "<imageUrl>",
        "color": "<color>",
        "code": "<code>",
        "UserId": "<UserId>",
        "createdAt": "<createdAt>",
        "updatedAt": "<updatedAt>",
    }
    ```

## Wishlists
* URL
    > /wishlists
* Method
    > Get
* Url Params
    > None
* Request Body
    > None
* Success Response (200)
    ```json
    {
        [
            "id": 1,
            "name": "Fine-knit polo-neck jumper",
            "price": "29.95",
            "imageUrl": "<imageUrl>",
            "color": "Khaki green",
            "createdAt": "<createdAt>",
            "updatedAt": "<updatedAt>",
            "UserId": 1
        ]
    }
    ```

## Delete Wishlist
* URL
    > /wishlists/:id
* Method
    > Delete
* Url Params
    > id
* Request Body
    > None
* Success Response (200)
    ```json
    {
        "message": "Success remove from wishlists"
    }
    ```