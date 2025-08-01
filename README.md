# 🚀 TaskFlow - Modern Task Management Application

<div align="center">
  
![TaskFlow Logo](screenshots/home.png)

**A beautiful, modern task management application built with React, Node.js, and MongoDB**

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=vercel)](https://taskflow-indol-six.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/SagarSuryakantWaghmare/taskflow)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

## 📋 Table of Contents

- [✨ Features](#-features)
- [🎯 Demo](#-demo)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🎨 Screenshots](#-screenshots)
- [🔧 Configuration](#-configuration)
- [📱 API Documentation](#-api-documentation)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👨‍💻 Developer](#-developer)

## ✨ Features

### 🎯 Core Features
- **Smart Task Management** - Create, edit, and organize tasks with priorities, categories, and due dates
- **Multiple Views** - Switch between Kanban board and list views
- **Category System** - Organize tasks with custom categories and colors
- **Priority Levels** - Set task priorities (low, medium, high) with color indicators
- **Due Date Tracking** - Calendar integration with overdue task highlighting
- **Task Archiving** - Keep workspace clean while preserving completed tasks

### 🎨 User Interface
- **Modern Design** - Beautiful dark theme with blue accent colors
- **Responsive Layout** - Fully responsive design for all devices
- **Smooth Animations** - Framer Motion animations for enhanced UX
- **Interactive Dashboard** - Real-time analytics and statistics
- **Mobile-First** - Touch-friendly interface optimized for mobile

### 🔒 Security & Performance
- **JWT Authentication** - Secure user authentication and authorization
- **User Isolation** - Private workspaces with isolated data
- **Real-time Updates** - Instant feedback with notifications
- **Data Validation** - Client and server-side validation
- **Error Handling** - Comprehensive error handling and user feedback

## 🎯 Demo

🌐 **Live Application**: [https://taskflow-sagar.vercel.app/](https://taskflow-sagar.vercel.app/)

### Quick Demo Account
```
Email: atharvawandhare@gmail.com
Password: 12345678
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library
- **Radix UI** - Accessible component primitives

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### DevOps & Deployment
- **Vercel** - Frontend deployment
- **Render** - Backend deployment
- **MongoDB Atlas** - Database hosting
- **Git & GitHub** - Version control

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/SagarSuryakantWaghmare/taskflow.git
cd taskflow
```

2. **Install dependencies for both client and server**
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. **Environment Configuration**

Create `.env` files in both client and server directories:

**Client (.env)**
```env
VITE_API_URL=http://localhost:3000/api
```

**Server (.env)**
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12
CLIENT_URL=http://localhost:5173
```

4. **Start the development servers**
```bash
# From the root directory, start both client and server
npm run dev

# Or start them separately:
# Start server (from server directory)
npm run dev

# Start client (from client directory)
npm run dev
```

5. **Open your browser**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 📁 Project Structure

```
taskflow/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── landing/    # Landing page components
│   │   │   ├── layout/     # Layout components
│   │   │   └── ui/         # UI components (shadcn/ui)
│   │   ├── lib/           # Utilities and API config
│   │   ├── pages/         # Page components
│   │   └── assets/        # Images and static files
│   ├── package.json
│   └── vite.config.js
├── server/                # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Custom middleware
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   └── db/           # Database configuration
│   ├── package.json
│   └── render.yaml       # Render deployment config
├── screenshots/          # Application screenshots
├── package.json         # Root package.json for concurrent dev
└── README.md
```

## 🎨 Screenshots

### 🏠 Landing Page
![Landing Page](screenshots/home.png)
*Modern landing page with hero section and feature highlights*

### 📊 Dashboard
![Dashboard](screenshots/features.png)
*Comprehensive dashboard with analytics and task overview*

### 🔐 Authentication
![Sign In](screenshots/signin.png)
*Clean and secure authentication interface*

### 💻 MacBook UI Demo
![MacBook UI](screenshots/macui.png)
*Interactive MacBook scroll component showcasing the application*

### 📱 Footer
![Footer](screenshots/footer.png)
*Professional footer with links and developer information*

## 🔧 Configuration

### Database Setup

**MongoDB Local Setup:**
```bash
# Install MongoDB
# macOS
brew install mongodb/brew/mongodb-community

# Ubuntu
sudo apt-get install mongodb

# Start MongoDB
mongod
```

**MongoDB Atlas Setup:**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Add to server `.env` file

### Environment Variables

**Required Server Environment Variables:**
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `CLIENT_URL` - Frontend URL for CORS
- `PORT` - Server port (default: 3000)

**Optional Server Environment Variables:**
- `NODE_ENV` - Environment (development/production)
- `JWT_EXPIRES_IN` - JWT expiration time
- `BCRYPT_SALT_ROUNDS` - Password hashing rounds

## 📱 API Documentation

### Authentication Endpoints

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Task Endpoints

```http
GET /api/todos
Authorization: Bearer <token>

POST /api/todos
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Task Title",
  "description": "Task Description",
  "priority": "high",
  "category": "work",
  "dueDate": "2024-12-31"
}
```

### Category Endpoints

```http
GET /api/categories
Authorization: Bearer <token>

POST /api/categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Category Name",
  "color": "bg-blue-500"
}
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```
3. **Commit your changes**
```bash
git commit -m 'Add some amazing feature'
```
4. **Push to the branch**
```bash
git push origin feature/amazing-feature
```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

### Code Style

- Use ESLint and Prettier for formatting
- Follow React best practices
- Use TypeScript-style JSDoc comments
- Maintain consistent naming conventions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

<div align="center">

### Sagar Suryakant Waghmare
*Full Stack Developer*

[![GitHub](https://img.shields.io/badge/GitHub-SagarSuryakantWaghmare-black?style=for-the-badge&logo=github)](https://github.com/SagarSuryakantWaghmare)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-sagarwaghmare44-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/sagarwaghmare44)
[![Email](https://img.shields.io/badge/Email-sagarwaghmare1384@gmail.com-red?style=for-the-badge&logo=gmail)](mailto:sagarwaghmare1384@gmail.com)
[![Behance](https://img.shields.io/badge/Behance-sagarwaghmare-blue?style=for-the-badge&logo=behance)](https://www.behance.net/sagarwaghmare)

</div>

### About the Developer

Passionate full-stack developer with expertise in modern web technologies. Specializing in:

- **Frontend**: React.js, Tailwind CSS, Modern UI/UX Design
- **Backend**: Node.js, Express.js, MongoDB, RESTful APIs
- **Mobile**: Responsive Design, Progressive Web Apps

---

<div align="center">

**⭐ If you found this project helpful, please give it a star! ⭐**

**🚀 [Visit TaskFlow Live](https://taskflow-indol-six.vercel.app) | 📖 [Read the Docs](#) | 🐛 [Report Bug](https://github.com/SagarSuryakantWaghmare/taskflow/issues)**

Made with ❤️ by [Sagar Waghmare](https://github.com/SagarSuryakantWaghmare)

</div>