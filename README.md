# 🪵 VanWood — Handcrafted Wooden Furniture eCommerce

A full-stack eCommerce platform for selling premium handcrafted wooden furniture and home decor from **Saharanpur, Uttar Pradesh, India** — the woodcraft capital of India.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🪵 About

**VanWood** brings the rich woodcraft heritage of Saharanpur directly to your doorstep. Saharanpur is internationally renowned for its intricate wood carving and handcrafted furniture, a tradition spanning centuries. This platform empowers local artisans to showcase and sell their creations online.

### Why VanWood?

- 🏠 **Direct from artisans** — No middlemen, fair prices
- 🪵 **Premium woods** — Sheesham (Indian Rosewood), Mango wood, and more
- 🇮🇳 **Made in India** — Supporting local craftsmanship
- 🔒 **Secure payments** — Powered by Razorpay

---

## ✨ Features

### Customer Features
- 🛍️ Browse handcrafted wooden furniture and home decor
- 🔍 Search and filter products by category, wood type
- 👤 User registration and secure login (JWT authentication)
- 🛒 Shopping cart management
- 💳 Secure checkout with Razorpay payment gateway
- 📦 Order tracking (Processing → Shipped → Delivered)

### Admin Features
- 📊 Product management (Create, Read, Update, Delete)
- 🖼️ Image upload to Cloudinary
- 📋 Order management and status updates
- 👥 User management

### Technical Features
- 🔐 JWT-based authentication with role-based access control
- 🔒 Password hashing with bcrypt
- ☁️ Cloud image storage with Cloudinary
- 📱 Fully responsive design
- 🌙 Premium dark theme with warm wood-tone aesthetics

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework for building APIs |
| **MongoDB** | NoSQL database for storing data |
| **Mongoose** | MongoDB object modeling (ODM) |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password encryption |
| **Cloudinary** | Cloud image storage |
| **Multer** | File upload handling |
| **Razorpay** | Payment gateway |

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI library |
| **Vite 5** | Build tool & dev server |
| **React Router** | Client-side routing |
| **Redux Toolkit** | Global state management |
| **Axios** | HTTP client for API calls |
| **React Icons** | Icon library |
| **React Hot Toast** | Notification toasts |

---

## 📁 Project Structure

```
VanWood/
│
├── 📄 .env                         # Environment variables (secrets)
├── 📄 .gitignore                   # Git ignore rules
├── 📄 package.json                 # Backend dependencies & scripts
├── 📄 README.md                    # You are here!
│
├── 🏗️ server/                      # ── BACKEND ──
│   ├── server.js                   # Express app entry point
│   │
│   ├── config/
│   │   ├── db.js                   # MongoDB connection
│   │   └── cloudinary.js           # Cloudinary + Multer setup
│   │
│   ├── models/
│   │   ├── User.js                 # User schema (auth, profile)
│   │   ├── Product.js              # Product schema (furniture data)
│   │   └── Order.js                # Order schema (purchases, payments)
│   │
│   ├── controllers/
│   │   ├── authController.js       # Register, login, profile logic
│   │   └── productController.js    # Product CRUD logic
│   │
│   ├── routes/
│   │   ├── authRoutes.js           # /api/auth/* endpoints
│   │   └── productRoutes.js        # /api/products/* endpoints
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js       # JWT verification & admin guard
│   │   └── errorMiddleware.js      # Global error handler
│   │
│   └── utils/
│       └── generateToken.js        # JWT token creation
│
└── 🎨 client/                      # ── FRONTEND ──
    ├── .env                        # Frontend environment variables
    ├── index.html                  # HTML entry point
    ├── vite.config.js              # Vite configuration
    ├── package.json                # Frontend dependencies
    │
    └── src/
        ├── main.jsx                # React entry point (Redux Provider)
        ├── App.jsx                 # Router & layout
        ├── index.css               # Global styles (dark wood theme)
        │
        ├── api/
        │   └── axios.js            # Axios instance with JWT interceptor
        │
        ├── store/
        │   └── store.js            # Redux Toolkit store
        │
        └── pages/
            └── Home.jsx            # Landing page
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed on your system:

- **Node.js** (v18 or higher) — [Download](https://nodejs.org/)
- **MongoDB** — [MongoDB Atlas (free cloud)](https://www.mongodb.com/atlas) or local installation
- **Git** — [Download](https://git-scm.com/)
- **Cloudinary account** (free) — [Sign up](https://cloudinary.com/)
- **Razorpay account** (for payments) — [Sign up](https://razorpay.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/VanWood.git
   cd VanWood
   ```

2. **Install backend dependencies** (from root directory)
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

### Environment Variables

Create a `.env` file in the **root** directory with the following variables:

```env
# Server
PORT=5000

# MongoDB — Get from MongoDB Atlas dashboard
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/vanwood

# JWT Secret — Use any random long string
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary — Get from Cloudinary dashboard
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay — Get from Razorpay dashboard
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

> ⚠️ **Never commit your `.env` file to Git!** It's already in `.gitignore`.

### Running the App

**Start the backend** (from root directory):
```bash
# Development mode (auto-restarts on file changes)
npm run dev

# Production mode
npm start
```
Backend runs at: `http://localhost:5000`

**Start the frontend** (from client directory):
```bash
cd client
npm run dev
```
Frontend runs at: `http://localhost:5173`

**Verify the backend** is running:
```bash
curl http://localhost:5000/api/health
# Response: { "success": true, "message": "VanWood API is running" }
```

---

## 📡 API Endpoints

### Health Check
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Check if the server is running |

### Authentication (`/api/auth`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | ❌ Public | Register a new user |
| `POST` | `/api/auth/login` | ❌ Public | Login & get JWT token |
| `GET` | `/api/auth/profile` | 🔒 Token | Get logged-in user's profile |

### Products (`/api/products`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/products` | ❌ Public | Get all products (with search & filter) |
| `GET` | `/api/products/:id` | ❌ Public | Get a single product by ID |
| `POST` | `/api/products` | 🔒 Admin | Create a new product |
| `PUT` | `/api/products/:id` | 🔒 Admin | Update a product |
| `DELETE` | `/api/products/:id` | 🔒 Admin | Delete a product |

### Query Parameters for `GET /api/products`
| Parameter | Example | Description |
|---|---|---|
| `search` | `?search=bookshelf` | Search products by name |
| `category` | `?category=Living Room` | Filter by category |

---

## 📸 Screenshots

> 🚧 *Screenshots will be added as the UI is developed.*

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m "Add amazing feature"`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Contribution Ideas
- 🛒 Build the shopping cart functionality
- 💳 Implement Razorpay payment flow
- ⭐ Add product reviews and ratings
- 📧 Add email notifications for orders
- 🔍 Implement advanced search with filters
- 📱 Improve mobile responsiveness

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 🙏 Acknowledgements

- The skilled woodcraft artisans of **Saharanpur, Uttar Pradesh** 🇮🇳
- [Express.js](https://expressjs.com/) — Fast, minimal web framework
- [MongoDB](https://www.mongodb.com/) — NoSQL database
- [React](https://react.dev/) — UI library
- [Vite](https://vitejs.dev/) — Next-gen frontend tooling
- [Razorpay](https://razorpay.com/) — Payment gateway for India
- [Cloudinary](https://cloudinary.com/) — Cloud image management

---

<p align="center">
  Made with ❤️ for the artisans of Saharanpur
</p>
# VanWood
