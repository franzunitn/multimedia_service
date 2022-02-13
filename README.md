***API DOCUMENTATION***

**Registration**
----
  Register a user to the login system and add the corrispetive user to recombee

* **URL**

  /register

* **Method:**

  `POST`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{
        "id": id of the item,
        "token": jwt token
    };`
 
* **Error Response:**

   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Invalid auth request" }`


**Login**
----
  Log the user on the system

* **URL**

  /login

* **Method:**

  `POST`

* **Data Params**

  **Required:**
  `{ "email": "email",  "password":"password"}`
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
     `{
        "token": jwt token
      };`
 
* **Error Response:**

  * **Code:** 500 UNAUTHORIZED <br />
    **Content:** `{ message : "All input is required" }`

  OR

   * **Code:** 500 BAD REQUEST <br />
    **Content:** `{ message : "Invalid credentials" }`


**Search cinema**
----
  Return the result of the query optionally filtered with type and genre and 5 recomendations for the user 

* **URL**

  /search-cinema/:keywords/:type?/:genre?

* **Method:**

  `GET`

* **Header Params**

  **Required:**
  `x-access-token=your_jwt`

* **Url Params**

  **Required:**
 
   `keywords=[keywords]`
  **Optional:**
 
   `type=[movie|tv]`
   `genre=[genre_id]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `
    [
    items = {
        "id": id of the item,
        "adult": adult,
        "year": year,
        "title": title,
        "overview": overview,
        "genre_ids": genre_ids,
        "original_language": original language
        ...
    };
    recomendations = {
        "id": id of the item,
        "adult": adult,
        "year": year,
        "title": title,
        "overview": overview,
        "genre_ids": genre_ids,
        "original_language": original language
        ...
    };
    ]
    `
 
* **Error Response:**

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ message : "Auth token must be specified" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Invalid token" }`

  OR

   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Invalid auth request" }`

**Search games**
----
  Return the result of the query optionally filtered with type and genre and 5 recomendations for the user 

* **URL**

  /search-games/:keywords/:genre?

* **Method:**

  `GET`

* **Header Params**

  **Required:**
  `x-access-token=your_jwt`

* **Url Params**

  **Required:**
    `keywords=[keywords]`
  **Optional:**
    `genre=[genre_id]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `
    [
    items = {
        "id": id of the item,
        "year": year,
        "title": title,
        "overview": overview,
        "genre_ids": genre_ids,
        "category": category
        ...
    };
    recomendations = {
        "id": id of the item,
        "year": year,
        "title": title,
        "overview": overview,
        "genre_ids": genre_ids,
        "category": category
        ...
    };
    ]
    `
 
* **Error Response:**

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ message : "Auth token must be specified" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Invalid token" }`

  OR

   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Invalid auth request" }`


**Show movie**
----
  Return the detail of a movie and add an interaction of type detail-view for the logged user to the recombee system

* **URL**

  /show-movie/:id

* **Method:**

  `GET`

* **Header Params**

  **Required:**
  `x-access-token=your_jwt`

* **Url Params**

  **Required:**
    `id=[id of the movie]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{
        "id": id of the item,
        "adult": adult,
        "year": year,
        "title": title,
        "overview": overview,
        "genre_ids": genre_ids,
        "original_language": original language
    };`
 
* **Error Response:**

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ message : "Auth token must be specified" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Invalid token" }`

  OR

   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Invalid auth request" }`

**Show tv**
----
  Return the detail of a tv show and add an interaction of type detail-view for the logged user to the recombee system

* **URL**

  /show-tv/:id

* **Method:**

  `GET`

* **Header Params**

  **Required:**
  `x-access-token=your_jwt`

* **Url Params**

  **Required:**
    `id=[id of the tv item]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{
        "id": id of the item,
        "year": year,
        "title": title,
        "overview": overview,
        "genre_ids": genre_ids,
        "original_language": original language
    };`
 
* **Error Response:**

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ message : "Auth token must be specified" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Invalid token" }`

  OR

   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Invalid auth request" }`

**Show game**
----
  Return the detail of a game and add an interaction of type detail-view for the logged user to the recombee system

* **URL**

  /show-game/:id

* **Method:**

  `GET`

* **Header Params**

  **Required:**
  `x-access-token=your_jwt`

* **Url Params**

  **Required:**
    `id=[id of the game]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{
        "id": id of the item,
        "year": year,
        "title": title,
        "overview": overview,
        "genre_ids": genre_ids,
        "category": category
    };`
 
* **Error Response:**

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ message : "Auth token must be specified" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Invalid token" }`

  OR

   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Invalid auth request" }`

**Watch movie**
----
  Simulates wathing a movie, return the detail of the movie and add an interaction of type purchase for the logged user to the recombee system

* **URL**

  /watch-game/:id

* **Method:**

  `GET`

* **Header Params**

  **Required:**
  `x-access-token=your_jwt`

* **Url Params**

  **Required:**
    `id=[id of the movie]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{
        "id": id of the item,
        "adult": adult,
        "year": year,
        "title": title,
        "overview": overview,
        "genre_ids": genre_ids,
        "original_language": original language
    };`
 
* **Error Response:**

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ message : "Auth token must be specified" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Invalid token" }`

  OR

   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Invalid auth request" }`

**Watch tv**
----
  Simulates wathing a tv show, return the detail of the tv show and add an interaction of type purchase for the logged user to the recombee system

* **URL**

  /watch-tv/:id

* **Method:**

  `GET`

* **Header Params**

  **Required:**
  `x-access-token=your_jwt`

* **Url Params**

  **Required:**
    `id=[id of the tv show]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{
        "id": id of the item,
        "year": year,
        "title": title,
        "overview": overview,
        "genre_ids": genre_ids,
        "original_language": original language
    };`
 
* **Error Response:**

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ message : "Auth token must be specified" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Invalid token" }`

  OR

   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Invalid auth request" }`

**Purchase game**
----
  Simulates buying a game, return the detail of the tv show and add an interaction of type purchase for the logged user to the recombee system

* **URL**

  /purchase-game/:id

* **Method:**

  `GET`

* **Header Params**

  **Required:**
  `x-access-token=your_jwt`

* **Url Params**

  **Required:**
    `id=[id of the game]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{
        "id": id of the item,
        "year": year,
        "title": title,
        "overview": overview,
        "genre_ids": genre_ids,
        "category": category
    };`
 
* **Error Response:**

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ message : "Auth token must be specified" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Invalid token" }`

  OR

   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Invalid auth request" }`


**Get recomendations**
----
  Get N recomendations for the logged user that can be filtered by the type of the item 

* **URL**

  /recomendations/:type/:number

* **Method:**

  `GET`

* **Header Params**

  **Required:**
  `x-access-token=your_jwt`

* **Url Params**

  **Required:**
  `type=[movies|games|tvs]`
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `
    [
    {
        "id": id of the item,
        "year": year,
        "title": title,
        "overview": overview,
        "genre_ids": genre_ids,
        "original_language": original language
    }
    ...
    ];
    `
 
* **Error Response:**

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ message : "Auth token must be specified" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Invalid token" }`

  OR

   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Invalid auth request" }`



