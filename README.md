# Fic-o-fit Backend System

### Overview

Private endpoint designed using Express framework and MongoDB as database (currently hosted in Aatlas). Integrated with Auth, JWT, Scoring System and Leaderboard Board.

### Stack used

Dillinger uses a number of open source projects to work properly:

- Express JS
- MongoDB
- Json Web Token (JWT)
- Bcrypt (Algorithm)
- Mongoose

### Getting Started

Fic-o-fit Backend requires [Node.js](https://nodejs.org/) v10+ to run.
Clone the repositories, Install the devDependencies and start the server.

`git clone https://github.com/Fic-o-Fit/ficofit-cloud.git`
`cd ficofit-cloud`
`npm i`
`npm run start-dev`

```
> fic-o-fit@1.0.0 start-dev
> nodemon app.js

[nodemon] 2.0.16
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
connected to mongoDB
Server started on localhost port 5000
```

### API References

### Auth Signup

```http
POST /signup
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `name`     | `string` | **Required**. Your name     |
| `email`    | `string` | **Required**. Your email    |
| `password` | `string` | **Required**. Your password |

Sample Request

```
curl -X POST \
  http://localhost:5000/signup \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "iamplayerfive@gmail.com",
  "password": "virtual-password",
  "name": "Player 5"
}'
```

Sample Response

```

{
"status": "signup successful"
}

```

### Auth Login

```http
POST /login
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. Your email    |
| `password` | `string` | **Required**. Your password |

Sample Request

```
curl -X POST \
  http://localhost:5000/login \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "iamplayerfive@gmail.com",
  "password": "virtual-password",
}'
```

Sample Response

```
{
    "message": "Logged in successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyOGZiMzYyMWZlYzNlMDZmZTVhMmRkYyIsImVtYWlsIjoiaWFtcGxheWVydGhyZWVAZ21haWwuY29tIn0sImlhdCI6MTY1MzcwNzgwMiwiZXhwIjoxNjUzNzA4MTAyfQ.sku8sWIlpmmZ_VwJ7_kOurxt3Qh9hotuw8EfI_Y6EZQ",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyOGZiMzYyMWZlYzNlMDZmZTVhMmRkYyIsImVtYWlsIjoiaWFtcGxheWVydGhyZWVAZ21haWwuY29tIn0sImlhdCI6MTY1MzcwNzgwMiwiZXhwIjoxNjUzNzk0MjAyfQ.7WRtP2KJk0hJKiytOtGqJOsky9AOjduOESEd0Gho7PU"
}
```

### Auth RefreshToken

```http
POST /token
```

| Parameter      | Type     | Description                          |
| :------------- | :------- | :----------------------------------- |
| `email`        | `string` | **Required**. Your email             |
| `refreshToken` | `string` | **Required**. Generated refreshToken |

Sample Request

```
curl -X POST \
  http://localhost:5000/token \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "iamplayerfive@gmail.com",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyOTE5NGZlYmM1MjViODQyN2U3YjFjNCIsImVtYWlsIjoiaWFtcGxheWVyZml2ZUBnbWFpbC5jb20ifSwiaWF0IjoxNjUzNzA4NTE0LCJleHAiOjE2NTM3OTQ5MTR9.gzGmsxOiCCnuTPpdbmcQ3GL5ScHhwpgGyu4Z4VUjbDU",
}'
```

Sample response

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaWFtcGxheWVyZml2ZUBnbWFpbC5jb20iLCJfaWQiOiI2MjkxOTRmZWJjNTI1Yjg0MjdlN2IxYzQifSwiaWF0IjoxNjUzNzA4NTYyLCJleHAiOjE2NTM3MDg4NjJ9.iay8poF-Bo0xRwL3kMZEPXNlXqGkHkAOa_oTnH4duog"
}
```

### Auth Logout

```http
POST /logout
```

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| `-`       | `-`  | `-`         |

Sample request

```
curl -X POST \
  http://localhost:5000/logout \
  -H 'Content-Type: application/json' \
```

Sample response

```
{
    "message": "logged out"
}
```

### Submit-Score

```http
POST /submit-score
```

| Parameter | Type      | Description               |
| :-------- | :-------- | :------------------------ |
| `email`   | `string`  | **Required**. Your email  |
| `score`   | `integer` | **Required**. Total score |

Sample Request

```
curl -X POST \
  http://localhost:5000/submit-score \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "iamplayerfive@gmail.com",
  "score": "85"
}'
```

Json response

```
{
    "status": "ok"
}
```

### Leaderboard

```http
GET /score
```

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| `-`       | `-`  | `-`         |

Sample json request

```
curl -X GET \
  http://localhost:5000/score \
  -H 'Content-Type: application/json' \

```

Json response

```
[
    {
        "name": "Player Three",
        "highScore": 104
    },
    {
        "name": "PlayerOne",
        "highScore": 88
    },
    {
        "name": "Player Three",
        "highScore": 85
    },
    {
        "name": "test5",
        "highScore": 80
    },
    {
        "name": "Player1",
        "highScore": 0
    },
    {
        "name": "Player1",
        "highScore": 0
    },
    {
        "name": "player1",
        "highScore": 0
    },
    {
        "name": "Player Two",
        "highScore": 0
    },
    {
        "name": "Player Three",
        "highScore": 0
    }
]
```
