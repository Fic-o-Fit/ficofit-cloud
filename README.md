# Fic-o-fit Backend System

### Overview

Private endpoint designed using Express framework and MongoDB as database (currently hosted in Aatlas). Integrated with Auth, JWT, Scoring System and Leaderboard Board.

### Stack used

Dillinger uses a number of open source projects to work properly:

#### Backend Stack

- Express JS
- MongoDB
- Json Web Token (JWT)
- Bcrypt (Algorithm)
- Mongoose
- Nodemon
- Tensorflow/Mobilenet
- Tensorflow/tfjs
- Tensorflow/tfjs-node
- dotenv
- Passport-jwt
- Passport-local

#### Cloud Stack

- Cloud Run
- CI/CD (Cloud Build and Cloud Deploy)
- Compute Engine

#### Infrastructure Provisioning

- Terraform

### Getting Started

Fic-o-fit Backend requires [Node.js](https://nodejs.org/) v10+ to run.
Clone the repositories, Install the devDependencies and start the server.

1. `git clone https://github.com/Fic-o-Fit/ficofit-cloud.git`
2. `cd ficofit-cloud`
3. `npm i`
4. `npm run start-dev`

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

### Database

We use MongoDB as database to save user data, score, calories count, etc. Currently we using Atlas MongoDB. There are field we use

| Parameter       | Type     | Description                 |
| :-------------- | :------- | :-------------------------- |
| `email`         | `string` | **Required**. User email    |
| `password`      | `string` | **Required**. User password |
| `name`          | `string` | **Required**. User name     |
| `gender`        | `string` | User gender                 |
| `height`        | `number` | User height                 |
| `weight`        | `number` | User weight                 |
| `calories`      | `number` | User calories counter       |
| `highScore`     | `number` | User highScore              |
| `resetToken`    | `string` | User resetToken             |
| `resetTokenExp` | `date`   | User resetTokenExp          |
| `createdAt`     | `date`   | User register               |

### API References

Currently we have 12 endpoint, also we provide the Endpoint, Sample request, parameter and sample response we used to develop our backend system. To simply development process if you are using postman you could import our enviroment and collection inside postman_files folder.

#### Health-check

1. Endpoint

```
GET /status
```

2. Sample Request

```
curl -X GET \
  http://localhost:5000/status \
  -H 'Content-Type: application/json'
```

3. Sample Response

```
{
    "status": "ok"
}
```

#### Auth Signup

1. Endpoint

```
POST /signup
```

2. Parameter

   | Parameter  | Type     | Description                 |
   | :--------- | :------- | :-------------------------- |
   | `name`     | `string` | **Required**. Your name     |
   | `email`    | `string` | **Required**. Your email    |
   | `password` | `string` | **Required**. Your password |

3. Sample Request

```
curl -X POST \
  http://localhost:5000/signup \
  -H 'Content-Type: application/json' \
  -d '{ \
  "email": "c2421h2994@gmail.com", \
  "password": "password", \
  "name": "ADI PURNOMO C2421H2994" \
}'
```

4. Sample Response

```

{
    "status": "Signup successful"
}

```

#### Auth Login

1. Endpoint

```
POST /login
```

2. Parameter
   | Parameter | Type | Description |
   | :---------: | :-------: | :--------------------------: |
   | `email` | `string` | **Required**. Your email |
   | `password` | `string` | **Required**. Your password |

3. Sample Request

```
curl -X POST \
  http://localhost:5000/login \
  -H 'Content-Type: application/json' \
  -d '{ \
  "email": "c2421h2994@gmail.com", \
  "password": "password" \
}'
```

4. Sample Response

```
{
    "message": "Logged in successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyYTYyNmExMmM5ODI0NWU1NjY4OTYwNiIsImVtYWlsIjoiYzI0MjFoMjk5NEBnbWFpbC5jb20ifSwiaWF0IjoxNjU1MDU2MTAyLCJleHAiOjE2NTUwNTY0MDJ9.Vseqo0FEvBYDUsiKvUXWF2ZkfFdSLasAOH7IvdbaNsc",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyYTYyNmExMmM5ODI0NWU1NjY4OTYwNiIsImVtYWlsIjoiYzI0MjFoMjk5NEBnbWFpbC5jb20ifSwiaWF0IjoxNjU1MDU2MTAyLCJleHAiOjE2NTUxNDI1MDJ9.oDSwOb42JEmDA22WOA1OFThGBgWmIl5qhpE51otTSWk"
}
```

#### Auth RefreshToken

1. Endpoint

```
POST /token
```

2. Parameter
   | Parameter | Type | Description |
   | :------------- | :------- | :----------------------------------- |
   | `email` | `string` | **Required**. Your email |
   | `refreshToken` | `string` | **Required**. Generated refreshToken |

3. Sample Request

```
curl -X POST \
  http://localhost:5000/token \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "c2421h2994@gmail.com", \
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyYTYyNmExMmM5ODI0NWU1NjY4OTYwNiIsImVtYWlsIjoiYzI0MjFoMjk5NEBnbWFpbC5jb20ifSwiaWF0IjoxNjU1MDU2MTAyLCJleHAiOjE2NTUxNDI1MDJ9.oDSwOb42JEmDA22WOA1OFThGBgWmIl5qhpE51otTSWk" \
}'
```

4. Sample response

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYzI0MjFoMjk5NEBnbWFpbC5jb20iLCJfaWQiOiI2MmE2MjZhMTJjOTgyNDVlNTY2ODk2MDYifSwiaWF0IjoxNjU1MDU2MTc4LCJleHAiOjE2NTUwNTY0Nzh9.xH2SA04zswp7FaC5PrO9ClQyjApwtWtw05Datr2MCSE"
}
```

#### Auth Logout

1. Endpoint

```
POST /logout
```

2. Sample request

```
curl -X POST \
  http://localhost:5000/logout \
  -H 'Content-Type: application/json'
```

3. Sample response

```
{
    "message": "User has been logged out successfully"
}
```

#### Get Profile

1. Endpoint

```
GET /profile
```

2. Sample Request

```
curl -X GET \
  http://localhost:5000/profile \
  -H 'Content-Type: application/json'
```

3. Sample Response

```
{
    "_id": "62a626a12c98245e56689606",
    "email": "c2421h2994@gmail.com",
    "name": "ADI PURNOMO C2421H2994",
    "height": 0,
    "weight": 0,
    "highScore": 0
}
```

#### Calories Info

1. Endpoint

```
GET /calories
```

2. Sample Request

```
curl -X GET \
  http://localhost:5000/calories \
  -H 'Content-Type: application/json'
```

3. Sample Response

```
[
    {
        "name": "Reski Mulud Muchamad",
        "calories": 0
    },
    {
        "name": "deandra",
        "calories": 0
    },
    {
        "name": "Adi Purnomo",
        "calories": 0
    },
    {
        "name": "Salma",
        "calories": 0
    },
    {
        "name": "ADI PURNOMO C2421H2994",
        "calories": 0
    }
]
```

#### Calories Counter

1. Endpoint

```
POST /calories-counter
```

2. Parameter

| Parameter | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `reps`    | `number` | **Required**. Your reps |

3. Sample Request

```
curl -X POST \
  http://localhost:5000/calories-counter \
  -H 'Content-Type: application/json' \
  -d '{ \
  "reps": "50", \
}'
```

4. Sample Response

```
{
    "user": "ADI PURNOMO C2421H2994",
    "weight": 55,
    "reps": "50",
    "calories_burn": 18.57
}
```

#### Submit Weight

1. Endpoint

```
POST /submit-weight
```

2. Parameter

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `weight`  | `number` | **Required**. Your weight |

3. Sample Request

```
curl -X POST \
  http://localhost:5000/submit-weight \
  -H 'Content-Type: application/json' \
  -d '{ \
  "weight": "55", \
}'
```

4. Sample Response

```
{
    "status": "Weight has been saved"
}
```

#### Leaderboard Info

1. Endpoint

```
GET /score
```

2. Sample Request

```
curl -X GET \
  http://localhost:5000/score \
  -H 'Content-Type: application/json'
```

3. Sample Response

```
[
    {
        "position": 1,
        "name": "Salma",
        "email": "salmashafirak@gmail.com",
        "score": 139
    },
    {
        "position": 2,
        "name": "Reski Mulud Muchamad",
        "email": "reski@gmail.com",
        "score": 64
    },
    {
        "position": 3,
        "name": "deandra",
        "email": "dee.sampoku@gmail.com",
        "score": 17
    },
    {
        "position": 4,
        "name": "Adi Purnomo",
        "email": "dev.adipurnomo@gmail.com",
        "score": 8
    },
    {
        "position": 5,
        "name": "ADI PURNOMO C2421H2994",
        "email": "c2421h2994@gmail.com",
        "score": 0
    }
]
```

#### Submit-Score

1. Endpoint

```
POST /submit-score
```

2. Parameter

   | Parameter | Type      | Description               |
   | :-------- | :-------- | :------------------------ |
   | `email`   | `string`  | **Required**. Your email  |
   | `score`   | `integer` | **Required**. Total score |

3. Sample Request

```
curl -X POST \
  http://localhost:5000/submit-score \
  -H 'Content-Type: application/json' \
  -d '{ \
  "score": "25", \
}'
```

4. Sample response

```
{
    "status": "Score has been saved"
}
```

#### Get Score specific user

1. Endpoint

```
GET /score/me
```

2. Sample Request

```
curl -X GET \
  http://localhost:5000/score/me \
  -H 'Content-Type: application/json'
```

3. Sample Response

```
{
    "position": 3,
    "name": "ADI PURNOMO C2421H2994",
    "email": "c2421h2994@gmail.com",
    "score": 25
}
```

### Infrastucture Provisioning

In the beginning we use Terraform to deploy our app to Cloud Run. Terraform template we provide in the terraform folder. Before using terraform you need to enable API and generate `credentials.json` by creating service account, select generate key. After you generate the key, put inside terraform folder. In order to deploy to Cloud Run you need to

1. Config variable in terraform/variables.tf
2. Variable you need to configure

   |       Parameter       |   Type    |              Description               |
   | :-------------------: | :-------: | :------------------------------------: |
   |     `project_id`      | `string`  |             GCP Project ID             |
   |   `project_region`    | `integer` |           GCP Project Region           |
   |    `project_zone`     | `string`  |            GCP Project Zone            |
   |        `name`         | `string`  |        Name of ther service/app        |
   |   `GCR_URL:COMMIT`    | `string`  |         GCR URL with commit id         |
   |   `container_port`    | `integer` |           Exposes port 5000            |
   |   `target_location`   | `string`  |    location you deploy the service     |
   | `allow_public_access` | `boolean` | Set true to allow unauthenticated user |

3. `terraform init`
4. `terraform plan`
5. `terraform apply -auto-approve`

After you apply terraform configuration. You will receive output of your Cloud Run URL.

### CI/CD Deployment

In order to apply DevOps culture, we use CI/CD using Cloud Build and Cloud Deployment services by Google. First, we create trigger in the Cloud Build and fill the require field, name, region set to global, event, sources repository, branch, configuration (cloudbuild.yaml) and add some environment to save database credentials (see cloudbuild.yaml line 10 and line 11). Other thing need to consider before applying the CI/CD Deployment. We create Dockerfile with the configuration below, we use node:18 to prevent error missing `id-linux-x86-64.so.2` and expose to port 5000.

Dockerfile configuration

```
FROM node:18

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["node", "app.js"]
EXPOSE 5000
```

After setup Dockerfile, we need to create cloudbuild.yaml. See our configuration in cloudbuid.yaml file. Save the Trigger and RUN to test the deployment. Process Deployment took under 5 minute. In this project we setup autobuild in branch development. Everytime we push into development branch CI/CD will running automatically.

### Credit and Learning resources

1. https://phasertutorials.com/creating-a-phaser-3-leaderboard-with-user-authentication-using-node-js-express-mongodb-part-1/
2. https://phasertutorials.com/creating-a-phaser-3-leaderboard-with-user-authentication-using-node-express-mongodb-part-2/
3. https://phasertutorials.com/phaser-leaderboard-with-user-authentication-using-node-express-mongodb-part-3/
4. https://phasertutorials.com/phaser-leaderboard-with-user-authentication-using-node-express-mongodb-part-4/
5. https://phasertutorials.com/phaser-leaderboard-with-user-authentication-using-node-express-mongodb-part-5/
6. https://www.mongodb.com/atlas/database
7. https://cloud.google.com/build/docs/deploying-builds/deploy-cloud-run
8. https://betterprogramming.pub/implementing-authentication-in-nodejs-with-express-and-jwt-codelab-1-c33afbccf1be
9. https://github.com/tsparticles/404-templates#404-space-page-preview
