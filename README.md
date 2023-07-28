# Nipa Ticket

Nipa Ticket is a web application that allows users to create, update, and manage support tickets. It consists of two main components: the backend server built with Nest.js and the frontend client built with React.

## For Backend

### Prerequisites

Before getting started with the backend, ensure you have the following installed on your system:

- Docker (for PostgreSQL)
- Node.js (v18.0.0 or higher)
- Yarn (v1.22.0 or higher)

### Getting Started

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

## For Frontend

### Prerequisites

Before getting started with the frontend, ensure you have the following installed on your system:

- Node.js (v18.0.0 or higher)
- Yarn (v1.22.0 or higher)

### Getting Started

1. CD to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install frontend dependencies:

   ```bash
   yarn install
   ```

3. Configure API URL:
   Open the `.env` file located in the frontend directory and set the API URL to connect with the backend. Modify the `REACT_APP_API_URL` to the URL of your backend server.

   ```
   REACT_APP_API_URL=http://localhost:3000
   ```

4. Start the frontend development server:

   ```bash
   yarn start
   ```

   The frontend will be accessible at the following URL:

   ```
   http://localhost:8080
   ```

   The frontend client provides a user-friendly interface for creating, updating, and managing support tickets.

## UI Workflow

For the user interface design, you can find the UI workflow in this Canva link: [Nipa Ticket UI Workflow](https://www.canva.com/design/DAFp8abCY5M/BBfdHsbaczwVD-Fac4Ztsw/edit?utm_content=DAFp8abCY5M&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton).

## Conclusion

With the backend server running on port 3000 and the frontend client accessible at port 8080, you can now use the Nipa Ticket to manage support tickets effectively. Enjoy the experience!

For any issues or inquiries, feel free to contact me at [befuddlement.live@gmail.com](befuddlement.live@gmail.com).

Thank you!
