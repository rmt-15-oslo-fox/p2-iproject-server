<h1>StockTix</h1>

**Create New User / Register**
----
  Returns an object of recently created user

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

    None

* **Body**

   **Required:**
 
   `username = string`

   `email = string`

   `password = string`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ id, email }`
    <p></p>

* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ message : "[Validation Error, ...]" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "internal server error" }`

<p>&nbsp</p>

**Login User**
----
  Returns a token of recently logged user

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

    None

* **Body**

   **Required:**
 
   `username = string`

   `password = string`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ access_token }`
    <p></p>

* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ message: "invalid username/password"} or { "message : "[Validation Error, ...]" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "internal server error" }`

<p>&nbsp</p>

  
**Read Watchlist data**
----
  Returns an array of watchlist data of current user

* **URL**

  /watchlists

* **Method:**

  `GET`

* **Headers**

  **Required:**

  `access_token`

*  **URL Params**

    None

* **Body**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[ { watchlist }, .... ]`
    <p></p>
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "internal server error" }`
    `
<p>&nbsp</p>


**Add to watchlist**
----
  Returns an array of recent added watchlist data

* **URL**

  /watchlist

* **Method:**

  `POST`

* **Headers**

  **Required:**

  `access_token`

*  **URL Params**

    `id = integer `

* **Body**

    stockName = string

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ stockName, userId }`
    <p></p>
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "internal server error" }`
    `
<p>&nbsp</p>

**Read Forum data**
----
  Returns an array of forum data

* **URL**

  /forums

* **Method:**

  `GET`

* **Headers**

  **Required:**

  `access_token`

*  **URL Params**

    None

* **Body**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[ { forum }, .... ]`
    <p></p>
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "internal server error" }`
    `
<p>&nbsp</p>

**Add to Forum**
----
  Returns an array of recent added forum data

* **URL**

  /forums

* **Method:**

  `POST`

* **Headers**

  **Required:**

  `access_token`

*  **URL Params**

    `id = integer `
    `email = string `

* **Body**

    stockName = string
    comment = string

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ stockName, comment, commentator, userId }`
    <p></p>
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "internal server error" }`
    `
<p>&nbsp</p>

<p>&nbsp</p>

**Fetch Data Using 3rd Party API**
----
<p>&nbsp</p>

**Fetch Composite Index**
----
  Using Yahoo Finance API, returns an object of composite chart data

* **URL**

  /composites

* **Method:**

  `GET`

* **Headers**

  **Required:**

  `access_token`

*  **URL Params**

    `index = string`

* **Body**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ` { composite } `
    <p></p>
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "internal server error" }`
    `
<p>&nbsp</p>

**Fetch Stock Index**
----
  Using Yahoo Finance API, returns an object of stock chart data

* **URL**

  /stocks

* **Method:**

  `GET`

* **Headers**

  **Required:**

  `access_token`

*  **URL Params**

    `stockName = string`

* **Body**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ` { stock } `
    <p></p>
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "internal server error" }`
    `
<p>&nbsp</p>

**Search Stock Index**
----
  Using Yahoo Finance API, returns an object of stock data with market summary

* **URL**

  /search

* **Method:**

  `GET`

* **Headers**

  **Required:**

  `access_token`

*  **URL Params**

    `stockName = string`

* **Body**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ` { stock } `
    <p></p>
 
* **Error Response:**

 * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "Stock not found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "internal server error" }`
    `
<p>&nbsp</p>

**Bulk Search Stock Index**
----
  Using Yahoo Finance API, returns multiple object of stock data with market summary

* **URL**

  /bulksearch

* **Method:**

  `GET`

* **Headers**

  **Required:**

  `access_token`

*  **URL Params**

    `stockName = string`

* **Body**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ` [ { stock }, .... ]`
    <p></p>
 
* **Error Response:**

 * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "Stock not found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "internal server error" }`
    `
<p>&nbsp</p>

**Fetch Market News**
----
  Using News API from newsapi.org, returns multiple object of market news data

* **URL**

  /news

* **Method:**

  `GET`

* **Headers**

  **Required:**

  `access_token`

*  **URL Params**

    `keywords = string`

* **Body**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ` [ { news }, .... ]`
    <p></p>
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "internal server error" }`
    `
<p>&nbsp</p>


**Upcoming features**
----

* **Stock Trading Demo**

<p>&nbsp</p>