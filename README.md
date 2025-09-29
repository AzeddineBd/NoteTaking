# 📝 MERN Stack Notes App - Full-Stack Secure Note-Taking Application

![Image placeholder for your app interface: a clean, organized screen showing notes and folders.]

**A robust, full-stack note-taking application built using the modern MERN Stack (MongoDB, Express, React, Node.js).**

## 🌟 Key Features

- **Full Authentication (Auth):** Secure user registration and login functionality.
- **Complete Note Management (CRUD):** Users can Create, Read, Update, and Delete notes.
- **Folder Organization:** Ability to create, update, and delete custom **folders** to organize notes efficiently.
- **Image Upload & Update:** Integrated with **Cloudinary** for secure and efficient cloud-based storage of note images.
- **RESTful API:** Full utilization of **GET, POST, PUT, DELETE** methods for seamless front-end and back-end interaction.

## 🛠️ Technology Stack & Libraries

This project leverages the **MERN stack** alongside powerful modern libraries to ensure high performance and a great user experience.

### Frontend Technologies

| Category             | Technology/Library                   | Description                                                                                                               |
| :------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| **Core Framework**   | **React.js (v19)**                   | A JavaScript library for building interactive user interfaces.                                                            |
| **State Management** | **Redux Toolkit (@reduxjs/toolkit)** | The official, opinionated, and highly recommended way to write Redux logic, ensuring clean and scalable state management. |
| **Styling**          | **Tailwind CSS**                     | A utility-first CSS framework for rapidly building custom designs without ever leaving your HTML/JSX.                     |
| **Routing**          | **React Router DOM (v7)**            | For declarative routing within the Single Page Application (SPA).                                                         |
| **Data Fetching**    | **Axios**                            | A popular promise-based HTTP client for making API requests.                                                              |
| **Notifications**    | **React-Toastify**                   | Used for beautiful and easy-to-use pop-up notifications (toasts) for user feedback (e.g., success/error messages).        |
| **Icons**            | **React-Icons**                      | A collection of popular icon libraries as React components.                                                               |
| **Build Tool**       | **Vite**                             | A next-generation frontend tooling that provides a fast development server and build process.                             |

### Backend Technologies

| Category          | Technology/Service       | Description                                                                             |
| :---------------- | :----------------------- | :-------------------------------------------------------------------------------------- |
| **Server**        | **Node.js & Express.js** | The runtime environment and framework used to build a robust and fast RESTful API.      |
| **Database**      | **MongoDB**              | A flexible, document-based NoSQL database for storing user and note data.               |
| **Media Storage** | **Cloudinary**           | A cloud service used to upload, store, and manage user-uploaded images and media files. |

## 🚀 Getting Started (Running Locally)

**Prerequisites:** Node.js, npm, and a MongoDB instance (local or Atlas URI).

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/AzeddineBd/NoteTaking](https://github.com/AzeddineBd/NoteTaking)
    cd notes-app-mern
    ```
2.  **Install Dependencies (for both environments):**

    ```bash
    # Install backend dependencies
    cd backend && npm install

    # Install frontend dependencies
    cd ../frontend && npm install
    ```

3.  **Environment Variables:**
    - Create a `.env` file in the **`backend`** folder and configure your variables (e.g., `MONGO_URI`, `JWT_SECRET`, `CLOUDINARY_CLOUD_NAME`, etc.).
4.  **Start the Application:**
    - Start the backend server:
      ```bash
      cd backend
      npm start # or npm run dev, depending on your setup
      ```
    - Start the frontend app:
      ```bash
      cd ../frontend
      npm run dev
      ```

The app will typically run at `http://localhost:5173` (or a similar port).

## 🔗 Important Links

- **Repository Link:** [https://github.com/AzeddineBd/NoteTaking](https://github.com/AzeddineBd/NoteTaking)

## 📸 Screenshots

### Landing Page

![Landing Page](https://github.com/AzeddineBd/NoteTaking/blob/main/frontend/public/screenshots/landingPage.png)

### Notes Dashboard

![Notes Dashboard](https://github.com/AzeddineBd/NoteTaking/blob/main/frontend/public/screenshots/dashboard.png)

### Edit Note

![Edit Note](https://github.com/AzeddineBd/NoteTaking/blob/main/frontend/public/screenshots/editNote.png)

### Profile Page

![profile](https://github.com/AzeddineBd/NoteTaking/blob/main/frontend/public/screenshots/profile.png)

### Login Page

![Login Page](https://github.com/AzeddineBd/NoteTaking/blob/main/frontend/public/screenshots/login.png)

### Register Page

![Register Page](https://github.com/AzeddineBd/NoteTaking/blob/main/frontend/public/screenshots/register.png)
