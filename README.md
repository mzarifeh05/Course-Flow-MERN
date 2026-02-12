# 🚀 Course Flow — MERN Stack Learning Platform

Course Flow is a full-stack MERN application designed to manage online courses with authentication, authorization, and modern cloud-based media handling.

🌐 **Live Demo:**  
https://course-flow-p5c7.onrender.com/

---

## ✨ Overview

Course Flow allows administrators to manage courses while students can explore, enroll, and interact with the platform securely.

This project was built as a real-world full-stack learning experience using modern web development practices.

---

## 🧠 Tech Stack

### Frontend
- React (Vite)
- Axios
- React Router
- CSS Modules

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt Password Hashing
- Cloudinary CDN

### Deployment
- Render (Frontend + Backend)

---

## 🔐 Features

### ✅ Authentication & Security
- User Registration & Login
- Password hashing using **bcrypt**
- Secure authentication using **JWT**
- Token stored on client side
- Protected routes

---

### 👥 Authorization (Role-Based Access)
- Default role: **Student**
- Static **Admin**
- Admin-only dashboard
- Backend role validation

---

### 📚 Course Management (CRUD)
Admin can:

- ➕ Create courses
- ✏️ Update courses
- ❌ Delete courses
- 👀 View all courses

Students can:

- Browse courses
- Enroll / Unenroll
- View enrolled courses

---

### 🖼️ Image Uploading with Cloudinary
Instead of storing images directly:

✔ Upload images to Cloudinary  
✔ Store only the **image URL** in MongoDB  
✔ Faster loading via CDN  
✔ Reduced database size

---

### 🔄 Enrollment System

When a student enrolls:

- Course schema adds student ID
- User schema adds course ID

This creates a **bi-directional relationship** between users and courses.
