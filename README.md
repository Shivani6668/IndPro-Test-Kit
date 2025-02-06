# Task Management App

A Task Management App is a software application designed to help individuals and teams organize, track, and manage tasks efficiently. It typically includes features such as:

✅ Task Creation & Assignment – Create tasks and assign them to team members.
✅ Priority & Deadlines – Set due dates and priorities for tasks.
✅ Task Status & Progress Tracking – Mark tasks as "To-Do," "In Progress," or "Completed."
✅ Integration & Automation – Sync with calendars, email, or third-party tools like Slack or Trello.


# Vite + React Project

## 🚀 Project Setup & Run Guide

### 📌 Prerequisites
Ensure you have *Node.js (v16 or later)* installed. Check your version:
sh
node -v

If Node.js is not installed, download it from [nodejs.org](https://nodejs.org/).

---

## 📦 Installation & Setup

### 1️⃣ Create a New Project
Run the following command to create a *Vite + React* project:
sh
npm create vite@latest my-vite-app --template react

Or using Yarn:
sh
yarn create vite@latest my-vite-app --template react

Or with PNPM:
sh
pnpm create vite@latest my-vite-app --template react


> Replace my-vite-app with your desired project name.

### 2️⃣ Navigate to the Project Directory
sh
cd my-vite-app


### 3️⃣ Install Dependencies
sh
npm install

Or:
sh
yarn install

Or:
sh
pnpm install


### 4️⃣ Start Development Server
sh
npm run dev

Or:
sh
yarn dev

Or:
sh
pnpm dev


📌 Open *http://localhost:5173/* in your browser to see the app running.

---

## 🔨 Build for Production
To generate an optimized production build:
sh
npm run build

The output will be available in the dist/ folder.

---

## 👀 Preview Production Build
To test the production build locally:
sh
npm run preview

It will serve the dist/ folder on a local server.

---

## 📂 Project Structure

my-vite-app/
│-- backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── taskController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   ├── config/
│   │   ├── db.js
│   ├── .env
│   ├── server.js
│   ├── package.json
│   ├── README.md
│
│-- src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── styles/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│
│-- .gitignore
│-- index.html
│-- package.json
│-- vite.config.js





# Task Manager API

## Overview
The Task Manager API allows users to manage their tasks efficiently. Users can create, update, delete, and retrieve tasks. Additionally, the API includes authentication functionalities such as user registration and login.

## Features
- **User Authentication**: Register and log in securely.
- **Task Management**:
  - Create new tasks.
  - Retrieve all tasks.
  - Update task details.
  - Delete tasks.
- **Filtering and Searching**:
  - Filter tasks by category, priority, or status.
  - Search tasks by title.
- **JWT-Based Authentication** for secure access.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JSON Web Token (JWT)
- **API Documentation**: Postman / Swagger (if applicable)

---

## API Endpoints

### Authentication

#### 1. User Registration
**Endpoint:** `POST /api/auth/register`
**Description:** Registers a new user.
**Request Body:**
json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}

**Response:**
json
{
  "message": "User registered successfully",
  "userId": "12345"
}


#### 2. User Login
**Endpoint:** `POST /api/auth/login`
**Description:** Logs in a user and returns a JWT token.
**Request Body:**
json
{
  "email": "john@example.com",
  "password": "securepassword"
}

**Response:**
json
{
  "token": "jwt_token_here"
}


---

### Task Management

#### 3. Get All Tasks
**Endpoint:** `GET /api/tasks`
**Headers:**
json
{
  "Authorization": "Bearer jwt_token_here"
}

**Response:**
json
[
  {
    "_id": "123",
    "title": "Complete project",
    "category": "Work",
    "priority": "High",
    "status": "Pending",
    "dueDate": "2025-02-10"
  }
]


#### 4. Create a Task
**Endpoint:** `POST /api/tasks`
**Headers:**
json
{
  "Authorization": "Bearer jwt_token_here"
}

**Request Body:**
json
{
  "title": "New Task",
  "category": "Personal",
  "priority": "Medium",
  "status": "Ongoing",
  "dueDate": "2025-02-15"
}

**Response:**
json
{
  "message": "Task created successfully",
  "task": {
    "_id": "456",
    "title": "New Task",
    "category": "Personal",
    "priority": "Medium",
    "status": "Ongoing",
    "dueDate": "2025-02-15"
  }
}


#### 5. Update a Task
**Endpoint:** `PUT /api/tasks/:id`
**Headers:**
json
{
  "Authorization": "Bearer jwt_token_here"
}

**Request Body:**
json
{
  "title": "Updated Task",
  "category": "Work",
  "priority": "High",
  "status": "Completed",
  "dueDate": "2025-02-18"
}

**Response:**
json
{
  "message": "Task updated successfully"
}


#### 6. Delete a Task
**Endpoint:** `DELETE /api/tasks/:id`
**Headers:**
json
{
  "Authorization": "Bearer jwt_token_here"
}

**Response:**
json
{
  "message": "Task deleted successfully"
}


---

## Installation & Setup

### 1. Clone the Repository
bash
git clone https://github.com/Shivani6668/IndPro-Test-Kit.git
cd task-manager-api


### 2. Install Dependencies
bash
npm install


### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add the following:

PORT=20000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key


### 4. Run the Server
bash
npm start
```
The API will be available at http://localhost:20000

---

## Future Enhancements
- Implement role-based authentication (Admin/User)
- Add task assignment feature
- Integrate email notifications for task deadlines

## License
This project is licensed under the MIT License.

---



## Acknowledgements
Challenges Faced & Solutions

1. Duplicate Task Creation

Issue: When adding a new task, it sometimes created duplicate entries.

Solution: Implemented unique validation on tasks and prevented multiple submissions by disabling the submit button until a response was received.

2. JWT Expiry Handling

Issue: Tokens were expiring without a proper refresh mechanism.

Solution: Implemented token expiration checks and auto-refresh using a refresh token strategy.

3. Error Handling for Invalid Inputs

Issue: Users were able to submit tasks with missing or invalid fields.

Solution: Added server-side and client-side validation to ensure all fields are required and formatted correctly.

4. Task Filtering & Searching

Issue: Initially, tasks were displayed without any filtering options.

Solution: Added filters for priority, category, and status to enhance user experience.

Future Enhancements

Implement notifications for due tasks

Introduce role-based access control (RBAC)

Add drag-and-drop task reordering
