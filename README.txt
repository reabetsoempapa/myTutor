# MyTutor Web Application

## Authors
- Reabetsoe Mpapa
- Amahle Jenete
- Inathi Bulwana

## Overview
This README provides an overview of the MyTutor Web Application project. 

Git repo: https://gitlab.cs.uct.ac.za/mytutor/mytutor/-/tree/main/Final%20Code%20Capstone

## Project Structure
The project is organized into two main folders:

1. **Frontend**:
   - Contains all the frontend files required to run the application using React.js.
   - `Frontend/src`: Contains the source code folders for the frontend.
   - `Frontend/src/Components`: Contains interface files and components used in the application.
   - `Frontend/src/Model`: Contains entity classes/models for the frontend.
   - `Frontend/src/Controller`: Contains project logic/controller classes.
   - `Frontend/src/Service`: Contains service classes that allow the app to connect to the backend.

2. **Backend**:
   - Contains the Spring Boot logic for the backend part.
   - Actual Backend Structure:
     - `Backend/src/main/java/com/example/demo/Collections`
     - `Backend/src/main/java/com/example/demo/Logic`
     - `Backend/src/main/java/com/example/demo/Repository`
     - `Backend/src/main/java/com/example/demo/Email`
   - Tests (Unit and Integration):
     - `Backend/src/test/java/com/example/demo` *(All Tests)*
     - `Backend/src/test/java/com/example/demo/Controllers` *(Integration Tests)*
     - `Backend/src/test/java/com/example/demo/Logic` *(Unit Tests)*

## Getting Started
To get started with the MyTutor Web Application, follow these steps:

1. Install Node.js if not already installed.
2. Navigate to the `Frontend` folder.
3. Open the command prompt.
4. Run the following commands:
   - `npm install` - to install all required React files/modules.
   - `npm start` - to run the application.

Your default web browser should open, and the application will be running.

