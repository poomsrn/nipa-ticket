<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Prerequisites

Before getting started with the backend, ensure you have the following installed on your system:

- Docker (for PostgreSQL)
- Node.js (v18.0.0 or higher)
- Yarn (v1.22.0 or higher)

## Getting Started

1. Clone the repository and navigate to the backend directory:

   ```bash
   git clone https://github.com/poomsrn/nipa-ticket.git
   cd backend
   ```

2. Create the `.env` file:

   - In the root directory of the backend project, create a new file named `.env`.

3. Add the following environment variables to the `.env` file:

   ```
   APP_ENV=development

   # DATABASE CONFIGURATION
   DATABASE_TYPE=postgres
   DATABASE_USER=admin
   DATABASE_PASSWORD=admin
   DATABASE_PORT=5431
   DATABASE_NAME=postgres
   DATABASE_HOST=localhost
   DATABASE_PROVIDE=DATA_SOURCE

   # HOST CONFIGURATION
   HOST_PORT=3000
   ```

   Note: You can customize the values of `DATABASE_USER`, `DATABASE_PASSWORD`, and other environment variables as needed.

4. (Optional) Changing Default Username, Password, and Port:

   By default, the PostgreSQL container is configured with the following credentials:

   - Username: admin
   - Password: admin
   - Port: 5431

   To change the default username, password, and port, follow these steps:

   - Open the `.env` file in a text editor and update the following lines:

     ```
     DATABASE_USER=my_custom_username
     DATABASE_PASSWORD=my_custom_password
     DATABASE_PORT=my_custom_port
     ```

     Replace `my_custom_username`, `my_custom_password`, and `my_custom_port` with your desired values.

   - Save the `.env` file.

5. Run Docker Compose to start the PostgreSQL container:

   ```bash
   docker-compose up -d
   ```

   - This will build the PostgreSQL container and expose it on port 5431 (default).

6. Install backend dependencies:

   ```bash
   yarn install
   ```

7. Start the backend server in development mode:

   ```bash
   yarn start:dev
   ```

   The backend server will be running on http://localhost:3000.

8. Access Swagger documentation:

   After starting the server, you can access the Swagger documentation at the following URL:

   ```bash
   http://localhost:3000/docs
   ```

   The Swagger documentation provides an interactive API explorer for the backend routes.

9. Running Tests:

   To run tests, execute the following command:

   ```bash
   yarn test
   ```

   The test suite will execute and provide feedback on the backend's functionality.
