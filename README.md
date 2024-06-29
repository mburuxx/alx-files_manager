# 0x04. Files Manager

## Description
This project summarizes the back-end trimester, covering authentication, NodeJS, MongoDB, Redis, pagination, and background processing. The goal is to create a platform for file upload and viewing.

## Team
- **John Mburu**
- **Kate Wuyep**

## Resources
Read or watch:
- [Node JS getting started](https://nodejs.org/en/docs/guides/getting-started-guide/)
- [Process API doc](https://nodejs.org/api/process.html)
- [Express getting started](https://expressjs.com/en/starter/installing.html)
- [Mocha documentation](https://mochajs.org/)
- [Nodemon documentation](https://nodemon.io/)
- [MongoDB](https://www.mongodb.com/)
- [Bull](https://github.com/OptimalBits/bull)
- [Image thumbnail](https://sharp.pixelplumbing.com/)
- [Mime-Types](https://www.npmjs.com/package/mime-types)
- [Redis](https://redis.io/)

## Repository
- GitHub repository: [alx-files_manager](https://github.com/mburuxx/alx-files_manager)

## Usage
1. Clone the repository
2. Install dependencies: `$ npm install`
3. Start the server: `$ npm run start-server`

## Features
- User authentication via token
- List all files
- Upload new files
- Change file permissions
- View files
- Generate image thumbnails

## Technologies
- **Back-end:** NodeJS, ExpressJS
- **Database:** MongoDB
- **Caching:** Redis
- **Queue Management:** Kue
- **JavaScript:** ES6

## Learning Objectives
By the end of this project, you should be able to:
- Develop an API using Express
- Implement user authentication
- Manage data storage in MongoDB
- Utilize Redis for temporary data storage
- Implement and manage background workers

## Requirements
- Allowed editors: `vi`, `vim`, `emacs`, `Visual Studio Code`
- Files interpreted/compiled on Ubuntu 18.04 LTS using node (version 12.x.x)
- All files must end with a new line
- Mandatory `README.md` file at the project root
- Use `.js` extension for all JavaScript files
- Code linting with ESLint

## Provided Files
- `package.json`
- `.eslintrc.js`
- `babel.config.js`

## Tasks

### 0. Redis utils
Create `utils/redis.js` with `RedisClient` class for managing Redis operations.

### 1. MongoDB utils
Create `utils/db.js` with `DBClient` class for managing MongoDB operations.

### 2. First API
Setup Express server in `server.js` and define routes in `routes/index.js` with endpoints for status and stats.

### 3. Create a new user
Add POST `/users` endpoint in `routes/index.js` and implement logic in `controllers/UsersController.js` to create users.

### 4. Authenticate a user
Implement user authentication endpoints in `routes/index.js`, handled by `AuthController.js` and `UsersController.js`.

### 5. First file
Implement POST `/files` endpoint in `routes/index.js` and logic in `controllers/FilesController.js` for file upload.

### 6. Get and list file
Implement endpoints in `routes/index.js` and `controllers/FilesController.js` to retrieve and list files.



