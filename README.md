# Todo App

This is a full-stack Todo application built with React for the client-side and Node.js with Express for the server-side. The application allows users to manage their todo items with a simple and beautiful user interface.

## Project Structure

The project is organized into two main directories: `client` and `server`.

### Client

The `client` directory contains the React application.

- **public/index.html**: The main HTML file where the React app is rendered.
- **src/components**: Contains the React components:
  - **TodoList.jsx**: Displays a list of todo items.
  - **TodoItem.jsx**: Represents a single todo item.
  - **AddTodo.jsx**: Form for adding new todo items.
- **src/App.jsx**: The main component that manages the state of the todo list.
- **src/index.js**: The entry point for the React application.
- **src/styles/App.css**: CSS styles for the application.
- **package.json**: Configuration file for the client-side application.

### Server

The `server` directory contains the Node.js application.

- **src/controllers/todoController.js**: Handles CRUD operations for todos.
- **src/models/todo.js**: Mongoose model defining the schema for todo items.
- **src/routes/todoRoutes.js**: Sets up the routes for the todo API.
- **src/app.js**: The entry point for the server-side application.
- **package.json**: Configuration file for the server-side application.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd todo-app
   ```

2. Install dependencies for the client:
   ```
   cd client
   npm install
   ```

3. Install dependencies for the server:
   ```
   cd ../server
   npm install
   ```

### Running the Application

1. Start the server:
   ```
   cd server
   node src/server.js
   ```

2. Start the client:
   ```
   cd client
   npm start
   ```

The application should now be running on `http://localhost:3000`.

## Usage

- Add new todo items using the form provided in the UI.
- View the list of todos and delete any item as needed.

## License

This project is licensed under the MIT License.