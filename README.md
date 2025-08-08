# Assignment Task – Full Stack Application

This repository contains both the UI (Frontend) and Backend for the Assignment Task project.
The application features role-based authentication, a MySQL database, and a secure API using JWT.

## 📂 UI – Frontend 🚀 Tech Stack React with Vite

- TypeScript

- React Router DOM (for routing)

- Role-Based Authentication

- React Toastify (for notifications)

## 📦 Installation & Setup Clone the repository

- Extract the zip file.

- Install dependencies by running:

  ```bash
  npm install

  ```

- Change directory to the project folder:

  ```bash
  cd <project-folder-name>

  ```

- Run the development server:
  ```bash
  npm run dev
  ```
- Access the app in your browser at:
  ```bash
  http://localhost:5173
  ```

## 📂 Backend – Node.js + Express + MySQL

### Prerequisites

- Node.js and npm installed

- MySQL installed and running

### Setup Instructions

#### Extract the backend project zip (or navigate to the backend folder).

#### Install dependencies:

```bash
npm install
```

- Create a MySQL database named:

```bash
assignment_task
```

- Open the database.js (or equivalent config file) and update the database connection with your MySQL root password:

```bash
const sequelize = new Sequelize("assignment_task", "root", "your_mysql_password", {
  dialect: "mysql",
  host: "localhost",
});
```

-Run the backend server (depending on your setup, e.g.,):

```bash
npm run dev
```

### Create Admin User

#### Add an user record in the users table of your MySQL database using register and change its role to admin for one admine role:

| Field  | Value   |
| :----- | :------ |
| `role` | `admin` |

#### General Notes

- The backend API uses JWT for authentication and role-based access control.

- Ensure the frontend uses the correct backend API URL in your environment variables.

- Use Postman or similar tools to test API endpoints independently.

- Keep your JWT secret key safe and do not expose it publicly.
