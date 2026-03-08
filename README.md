# School Management API

A production-ready Node.js/Express backend with PostgreSQL to manage schools and calculate distance from user location.

## Features
- Add a new school with name, address, latitude, and longitude.
- List all schools sorted by their proximity to a given location (Latitude and Longitude).
- Haversine formula for precise distance calculation.
- Clean and scalable directory structure.

## Tech Stack
- **Node.js**: Runtime environment.
- **Express.js**: Web framework.
- **PostgreSQL**: Relational database.
- **pg**: PostgreSQL client for Node.js.
- **dotenv**: Environment variable management.
- **express-validator**: Request validation.

## Prerequisites
- Node.js (v14 or later)
- PostgreSQL database (Online/Local)

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd school-management-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your PostgreSQL connection string:
   ```env
   PORT=3000
   DATABASE_URL=postgres://user:password@host:port/database?ssl=true
   ```

4. **Initialize Database**:
   Run the following SQL query in your PostgreSQL database to create the `schools` table:
   ```sql
   CREATE TABLE schools (
       id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       address VARCHAR(255) NOT NULL,
       latitude FLOAT NOT NULL,
       longitude FLOAT NOT NULL
   );
   ```

5. **Run the server**:
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## API Documentation

### 1. Add School
**Endpoint:** `POST /api/addSchool`

**Request Body:**
```json
{
  "name": "Green Valley School",
  "address": "MG Road, Bangalore",
  "latitude": 12.9716,
  "longitude": 77.5946
}
```

**Response:**
- **Success (201):**
  ```json
  {
    "success": true,
    "message": "School added successfully"
  }
  ```
- **Validation Error (400):**
  ```json
  {
    "success": false,
    "errors": [ ... ]
  }
  ```

### 2. List Schools
**Endpoint:** `GET /api/listSchools?latitude=12.9716&longitude=77.5946`

**Query Parameters:**
- `latitude`: User's current latitude (Required)
- `longitude`: User's current longitude (Required)

**Response:**
- **Success (200):**
  ```json
  [
    {
      "id": 1,
      "name": "Green Valley School",
      "address": "MG Road, Bangalore",
      "latitude": 12.9716,
      "longitude": 77.5946,
      "distance_km": 0
    },
    ...
  ]
  ```

## Postman Testing Guide
A Postman collection is provided in the root directory as `school_management_api.postman_collection.json`. Import this into Postman to test the APIs.

## Deployment
This project is ready to be deployed on platforms like **Render**, **Railway**, or **Vercel**. Ensure you set the `DATABASE_URL` environment variable on the platform.
