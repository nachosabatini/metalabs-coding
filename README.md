## Prerequisites

- Docker: Ensure that you have Docker installed on your system. You can download and install Docker from the official website: [https://www.docker.com](https://www.docker.com)

Follow these steps to run the project:

1. Clone the repository: `git clone https://github.com/nachosabatini/metalabs-coding`
2. Change to the project directory: `cd metalabs-coding`
3. Create `.env` file on root directory and add the following variables:

```
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=metalabs-coding-challenge
DB_NAME=metalabs-coding-challenge
DB_USER=admin
DB_PASSWORD=admin

```

4. Change to the backend directory: `cd backend`
5. Create `.env` file on backend directory and add the following variables:

```
DB_NAME=metalabs-coding-challenge
DB_USER=admin
DB_PASSWORD=admin
DB_HOST=db
DB_PORT=5432
JWT_SECRET=eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4ODI3MTEzMiwiaWF0IjoxNjg4MjcxMTMyfQ.tx7EcAk1TZVjf-BPP0a2s0-WT9gC37iJJNnwWwrqX6U

```

6. Change to the root directory: `cd ..`
7. Start the Docker containers: `docker-compose up`
8. Access the application at [http://localhost:3000](http://localhost:3000)
9. Create an account and login to the application
10. Enjoy!

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom user interfaces
- [Node.js](https://nodejs.org/en/) - A JavaScript runtime built on Chrome's V8 JavaScript engine
- [Express](https://expressjs.com/) - A minimal and flexible Node.js web application framework
- [PostgreSQL](https://www.postgresql.org/) - A powerful, open source object-relational database system
- [Docker](https://www.docker.com/) - A set of platform as a service products that use OS-level virtualization to deliver software in packages called containers
- [Docker Compose](https://docs.docker.com/compose/) - A tool for defining and running multi-container Docker applications
