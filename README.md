# Library Management System

## Overview

The Library Management System is a full-stack application built with **Spring Boot** for the backend and **ReactJS** for the frontend. It allows users to manage a collection of books, authors, and library members. The application utilizes **MongoDB Atlas** as the database to store information about books, authors, members, and borrow records.

### Features

- **Book Management**: Add, update, delete, and view books in the library.
- **Author Management**: Manage authors of the books.
- **Member Management**: Keep track of library members and their details.
- **Borrow Records**: Track book borrowing and returning activities.

### Technologies Used

- **Backend**: Spring Boot, MongoDB, MongoDB Atlas
- **Frontend**: ReactJS, React Hooks
- **Database**: MongoDB Atlas (Cloud Database)
- **Styling**: Bootstrap, Material UI
---

## Table of Contents

- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Frontend Screenshots](#frontend-screenshots)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/tusharharyana/library-management-system-microservice.git
   ```

2. Navigate to the root directory where the `pom.xml` file is located. If you haven't already, you may need to have `Java and Maven` installed.

   Run the following command to install the required dependencies for the backend:
   ```bash
   mvn install
   ```
3. Navigate to the frontend folder where the `package.json` file is located:
   ```bash
   cd frontend
   npm install
   ```
### Backend Setup
   Make sure you have MongoDB Atlas set up and connected to your Spring Boot application. You should set the `MONGODB_URI` in your `application.properties` file in the Spring Boot project to point to your MongoDB Atlas cluster.

   Once the dependencies are installed, you can run the Spring Boot backend:

   ```bash
   mvn spring-boot:run

   ```

### Frontend Setup
   After installing the dependencies in the frontend directory, run the ReactJS frontend:
   ```bash
   npm start
   ```
This will start the React application on `http://localhost:3000`.

### Running the Application
- Backend (Spring Boot): The Spring Boot API will run on `http://localhost:8081`.
- Frontend (ReactJS): The React frontend will run on `http://localhost:3000`.
- You can access the full application by visiting the frontend URL, which interacts with the backend API.

![Dashboard](/screenshots/Dashboard.png)
![Dashboard](/screenshots/Books.png)
![Dashboard](/screenshots/Authors.png)
![Dashboard](/screenshots/Members.png)
![Dashboard](/screenshots/Borrows.png)


