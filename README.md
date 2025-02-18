## Prerequisites
- docker (optional)
- git 
- node js - 20.11.1

## Getting Started

- `git clone https://github.com/kairo-18/go8-ads-nestjs`
- `cd go8-ads-nestjs`
- `npm install`
- `docker-compose up` (optional), install & setup postgres
- `setup the .env`
```.env

DB_HOST= 127.0.0.1
POSTGRES_DB= postgres
DB_PORT= 5434
DB_USERNAME= 
DB_PASSWORD= 
DB_NAME= go8Nest

```
- `npm run start:dev`

 
# API Documentation

## Users Endpoints

### Create User
**POST** `/users`

**Request Body:**
{
  "username": "string",
  "password": "string"
}

**Response:**
{
  "id": "number",
  "username": "string",
  "password": "string"
}

### Get All Users
**GET** `/users`

**Response:**
[
  {
    "id": "number",
    "username": "string",
    "password": "string"
  }
]

### Get User by Username
**GET** `/users/:username`

**Response:**
{
  "id": "number",
  "username": "string",
  "password": "string"
}

### Update User
**PATCH** `/users/:id`

**Request Body:**
{
  "username": "string",
  "password": "string"
}

**Response:**
{
  "id": "number",
  "username": "string",
  "password": "string"
}

### Delete User
**DELETE** `/users/:id`

**Response:**
{
  "message": "User deleted successfully"
}

## Auth Endpoints

### Login
**POST** `/auth/login`

**Request Body:**
{
  "username": "string",
  "password": "string"
}

**Response:**
{
  "access_token": "string"
}

## Ads Upload Endpoints

### Upload Ad
**POST** `/ads-upload`

**Request Body:**
- Form-data with key `ads` and file as value

**Response:**
{
  "statusCode": 200,
  "message": "File uploaded successfully",
  "fileUrl": "http://localhost:3000/uploads/filename"
}

## Screens Endpoints

### Create Screen
**POST** `/screens`

**Request Body:**
{
  "name": "string",
  "routeName": "string",
  "layoutType": "string",
  "ads": [
    {
      "title": "string",
      "mediaUrl": "string"
    }
  ]
}

**Response:**
{
  "message": "This action adds a new screen"
}

### Get All Screens
**GET** `/screens`

**Response:**
[
  {
    "id": "number",
    "name": "string",
    "routeName": "string",
    "layoutType": "string",
    "createdAt": "string",
    "ads": [
      {
        "id": "number",
        "title": "string",
        "mediaUrl": "string"
      }
    ]
  }
]

### Get Screen by ID
**GET** `/screens/:id`

**Response:**
{
  "id": "number",
  "name": "string",
  "routeName": "string",
  "layoutType": "string",
  "createdAt": "string",
  "ads": [
    {
      "id": "number",
      "title": "string",
      "mediaUrl": "string"
    }
  ]
}

### Update Screen
**PATCH** `/screens/:id`

**Request Body:**
{
  "name": "string",
  "routeName": "string",
  "layoutType": "string",
  "ads": [
    {
      "title": "string",
      "mediaUrl": "string"
    }
  ]
}

**Response:**
{
  "message": "Screen not found" // or updated screen object
}

### Delete Screen
**DELETE** `/screens/:id`

**Response:**
{
  "message": "Screen deleted successfully"
}

### Add Ad to Screen
**POST** `/screens/:id/ads`

**Request Body:**
{
  "title": "string",
  "mediaUrl": "string"
}

**Response:**
{
  "id": "number",
  "name": "string",
  "routeName": "string",
  "layoutType": "string",
  "createdAt": "string",
  "ads": [
    {
      "id": "number",
      "title": "string",
      "mediaUrl": "string"
    }
  ]
}

### Update Ad
**PATCH** `/screens/:screenId/ads/:adId`

**Request Body:**
{
  "title": "string",
  "mediaUrl": "string"
}

**Response:**
{
  "message": "Ad updated successfully",
  "ad": {
    "id": "number",
    "title": "string",
    "mediaUrl": "string"
  }
}

### Remove Ad
**DELETE** `/screens/:screenId/ads/:adId`

**Response:**
{
  "message": "Ad removed successfully",
  "screen": {
    "id": "number",
    "name": "string",
    "routeName": "string",
    "layoutType": "string",
    "createdAt": "string",
    "ads": [
      {
        "id": "number",
        "title": "string",
        "mediaUrl": "string"
      }
    ]
  }
}
