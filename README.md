# AidUrgency Backend


### Locally run this project
# client side : npm run dev
# server side : nodemon index.js


### Technology:

## Frontend

# Html, Css, Tailwind Css, Material UI, React, TypeScript , Redux , RTK query, .

## Backend

# Node js, Express js, JWT,

## Database

# MongoDB

## Animation

# Framer Motion / AOS

### Feature:

## Dark theme

## Authentication

## Dashboard

# Do not access dashboard page without login.

# user can register/login

# user can donate

# A Volunteer fil the submission form and join us.

# A donor create post for his donor review.

# Top donor list page

# Pie & Bar chart implementation to show our success, complete project, due, total donors and total user.

## Donation Crud Operation

# User can create/update/delete Donations post.

# User can comment in community wall page and express his gratitude

## Full mobile first responsive UI design in fixel perfect.

### Client side url link:https://aidurgency.vercel.app/

### Server side url link: https://aidurgency-server.vercel.app/

#### Video url link:https://www.awesomescreenshot.com/video/25413142?key=6dcf3d3a12e50a25ff00246e7b0ab61a

## Installation:
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Rename `.env.example` to `.env`.
4. Run the server using `npm run dev`.

### Before Pushing Code:
1. Before pushing your code to the remote repository, ensure that you have run the following command in your terminal (Git Bash):
    ```bash
    rm -rf .git
    ```

## Configuration:
- Environment Variables:
  - `PORT`: Port number the server listens on. Default: 3000
  - `MONGODB_URI`: URI for MongoDB database.
  - `JWT_SECRET`: Secret key for JWT token generation.
  - `EXPIRES_IN`: Token expiration time.

## Usage:
- API Endpoints:
  - POST `/api/auth/login`
    - Description: Authenticates user and returns a JWT token.
    - Request: 
        ```json
        { 
            "email": "example@email.com", 
            "password": "password" 
        }
        ```
    - Response: 
        ```json
        {
            "success": true, 
            "message": "User registered successfully"
        }
        ```

  - POST `/api/auth/register`
    - Description: Registers a new user.
    - Request:
        ```json
        { 
            "name": "John", 
            "email": "example@email.com", 
            "password": "password" 
        }
        ```
    - Response: 
        ```json
        {
            "success": true,
            "message": "Login successful",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBoMkBleGFtcGxlLmNvbSIsImlhdCI6MTcwNzg1MDYyMSwiZXhwIjoxNzA3OTM3MDIxfQ.7EahSgmPLPNuZ_T9ok-B6TayWCJVdxPzi_Nx4UfrhvY"
        }
        ```

## Dependencies:
- `bcrypt`: Library for hashing passwords.
- `cors`: Express middleware for enabling CORS.
- `dotenv`: Loads environment variables from .env file.
- `express`: Web framework for Node.js.
- `jsonwebtoken`: Library for generating and verifying JWT tokens.
- `mongodb`: MongoDB driver for Node.js.
- `nodemon`: Utility for automatically restarting the server during development.

