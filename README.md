# 🚀 HackFeed — A Full-Stack Social Feed App (React + Supabase)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=flat-square)
![React](https://img.shields.io/badge/React-20232a?logo=react&logoColor=61DAFB&style=flat-square)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white&style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Demo](https://img.shields.io/badge/Live-Demo-success?style=flat-square)


HackFeed is a full-stack feed application built with **React** and **Supabase**, designed to showcase modern web development practices. It allows users to register, log in, and interact with a feed through posting, liking, deleting, and sharing content.

> 🛠️ This project is part of a technical assignment, demonstrating both frontend and backend integration with a focus on SQL-backed architecture and scalable design.

---

## 📚 Table of Contents

- [Tech Stack & Dependencies](#-tech-stack--dependencies)
- [Features](#-features)
- [Project Architecture & Technical Decisions](#-project-architecture--technical-decisions)
- [Getting Started](#-getting-started)
- [Project Goals](#-project-goals)
- [Screenshots](#-screenshots)
- [Live Demo](#-live-demo)
- [Author](#-author)


## 📦 Tech Stack & Dependencies

### 🧩 Frontend Framework & Styling
- **React** - UI library for building interactive UIs
- **Vite** - Next-gen frontend tooling for fast builds
- **Tailwind CSS** - Utility-first CSS framework
- **MUI (Material UI)** - Component library based on Google’s Material Design
- **Emotion** - CSS-in-JS styling (used by MUI)
- **Notistack** - Snackbar notification library (built on top of MUI)

### 🧠 State Management & Data
- **Zustand** - Lightweight state management
- **React Query (@tanstack/react-query)** - Data fetching & caching
- **Supabase JS** - Backend-as-a-service client for authentication, database, and storage

### 🧾 Forms & Validation
- **React Hook Form** - Performant, flexible forms in React
- **Yup** - Schema-based form validation

### 🌐 Routing
- **React Router DOM** - Declarative routing for React apps

### 📏 Linting & Formatting
- **ESLint** - JavaScript/TypeScript linter
- **Prettier** - Code formatter

## ✨ Features

- 🔐 **Authentication**: Register, log in, and manage user sessions via Supabase Auth
- 📝 **Feed CRUD**:
    - Add new posts
    - Like and share posts
    - Delete your own posts
    - Feed updates reflect in real-time
- 🧑‍💼 **User Profiles**:
    - Editable name, title, and avatar
    - View own profile and others
- 🔍 **Filter by User**:
    - Visit another user's profile to view only their posts

---

## 🧠 Project Architecture & Technical Decisions

HackFeed follows modern, scalable frontend architecture principles to ensure maintainability and performance. Below are some key decisions made during development:

### 📁 Code Structure

- **`components/`** - Reusable UI parts (cards, background, header, etc.)
- **`pages/`** - Page-level views matching routes (Feed, Profile, Auth)
- **`hooks/`** - Custom logic for data fetching (e.g., using `useQuery` & `useMutation`)
- **`services/`** - API interaction layer (e.g., Supabase Auth and Posts)
- **`schemas/`** - Validation schemas using `Yup`
- **`store/`** - Zustand for global state (e.g., auth, user info)
- **`types/`** - Centralized TypeScript types for consistent data shape
- **`utils/`** - Helper functions for tasks like formatting or date logic

### 🧪 Data Fetching & Caching

- All queries are wrapped in **custom hooks** using `@tanstack/react-query`
    - Encourages separation of logic and UI
    - Handles loading, caching, and refetching automatically
- Queries are triggered in components using hook invocations, keeping components clean and declarative.

### 🔐 Authentication & Session Management

- Auth is handled via **Supabase Auth** with JWT-based session tokens
- The authenticated user is managed through a **Zustand store**
- On login or refresh, the app checks and syncs the session to persist user state

### 🌍 Internationalization-Ready Strings

- User-facing messages are **centralized into constants** (e.g., `src/constants/toastMessages.ts`)
    - This makes the UI easier to maintain, test, or localize in the future

---

These decisions improve:
- **Readability** and onboarding experience
- **Code reusability** and testability
- **Separation of concerns**
- **Scalability** for future features
---

## 🗃️ SQL & Supabase Integration

Supabase provides a PostgreSQL backend with real-time capabilities. This project uses custom SQL queries to join user and post data, and to implement profile-level filtering.

### Example SQL Query
```sql
SELECT posts.*, users.name
FROM posts
JOIN users ON posts.user_id = users.id
WHERE users.id = 'some_user_id';
```

- Uses `JOIN` to fetch post + user details
- Filters posts by individual user for profile views
- Real-time sync with Supabase’s built-in listeners

---

## 🧪 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/hackfeed.git
cd HackFeed
```

### 2. Install Dependencies

```bash
npm install
```

### 3. **Set Up Environment Variables**

Create a `.env` file in the root directory and add your Supabase credentials:

```plaintext
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
#### NOTE: Make sure to replace `your_supabase_url` and `your_supabase_anon_key` with the actual Supabase project credentials I have provided.

### 4. Start the Development Server

```bash
npm run dev
```

# 🛡️ Admin Access for Report System Testing

To test the **report flow** (flagging and reviewing posts), you can use the following administrator credentials:


With this account, you will have access to:

- Deleting **all posts** including those that have been reported
- Seeing detailed **user information** related to each post
- Accessing the **admin interface** to review and act on reports

The admin flow includes:

- Role-based access control
- Moderation features (report handling)
- Visibility into all user-generated content

---

## 📌 Project Goals

- Build a real-world, data-driven React application
- Deepen understanding of SQL JOINs and PostgreSQL via Supabase
- Demonstrate clean architecture and maintainable code
- Prepare for technical discussions and interviews

## 🗂️ Database Schema

| Table     | Fields                                                   |
|-----------|----------------------------------------------------------|
| `posts`   | `id`, `content`, `created_at`, `user_id`                 |
| `profiles`| `id`, `name`, `email`, `title`, `avatar_url`,            |
| `likes`   | `post_id`, `user_id`, `created_at`                       |
| `shares`  | `post_id`, `shared_by_id`, `shared_at`                   |

Views: `feed_posts_shared` (includes shared_by_id, shared_by_name, shared_by_avatar_url, shared_by_title, shared_at, shared, like_count, share_content, liked_by_current_user)

## 📷 Screenshots

| Feed View                     | User Profile                  |
|------------------------------|-------------------------------|
| ![Feed Screenshot](https://github.com/user-attachments/assets/3eadccc1-9c6a-4bca-8070-49e9a36a637d) | ![Profile Screenshot](https://github.com/user-attachments/assets/748d915a-6863-4c24-97f0-5be2998f37b2) |


## 🌐 Live Demo

You can explore the app here: [EXPLORE APP](https://hack-feed-real.vercel.app/)


---

## 👨‍💻 Author

Created by **Slavi Dimitrov**  
This project is a technical showcase of full-stack development skills.
