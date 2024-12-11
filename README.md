# Inventory Management System

This is a project made as a result from Bayan Academy's Back End Web Development 101 class.

## Requirements

The project needs the following installed on the machine:

- Node 18.x and above
- NPM 10.x and above
- MongoDB 7.x and above

## Setup

1. Clone this repository
2. Create an ENV (.env) file in the repository folder that contains:

- PORT (the port where the project will run)
- MONGODB_URI (the URI for MongoDB; use localhost)
- JWT_SECRET (the secret string for JWT authentication; generate a random string for this)

3. Install dependencies by using npm install
4. Run the project by using node index.js

## Logging in

**Default username is user, default password is inventory2024!**

You may add users by updating src/database/userSeeder.js, then run node src/database/userSeeder.js
