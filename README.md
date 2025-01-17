
# capitall
```
This is an OLX clone application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application allows users to register, login, list items for sale, and view available items. It also includes a middleware for authentication.
```
## Features
```
- User registration and login
- List items for sale
- View all listed items (only unsold items)
- View user-specific uploaded items (with sold/unsold status)
- View user-specific purchases
- Responsive design using Chakra UI
```
## Tech Stack
```
- MongoDB (with Atlas hosting)
- Express.js
- React.js
- Node.js
```

## Prerequisites

Before you begin, ensure you have met the following requirements:
```
- Node.js and npm installed
- MongoDB Atlas account for database hosting
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Dayasagar301/capitall.git
   cd olx-clone
   ```
Install server dependencies:

```
cd Backend
npm install
```
Install client dependencies:

```
cd ../Frontend
npm install

```


Running the Application
Backend
Start the backend server:

```
cd Backend
npm start
The backend server will start on https://capitall-5.onrender.com/
```
Frontend
Start the frontend server:

```
cd Frontend
npm start
The frontend server will start on https://capitall-nw2b.vercel.app/
```

Deployment
Deployed Links
```
Frontend: https://capitall-nw2b.vercel.app/
Backend: https://capitall-5.onrender.com/
```
API Endpoints
Authentication
```
POST /api/auth/register: Register a new user
POST /api/auth/login: Login a user
GET /api/auth/user: Get user details (requires authentication)
```
Items
```
POST /api/items: Create a new item (requires authentication)
GET /api/items: Get all unsold items
GET /api/items/myitems: Get items uploaded by the user (requires authentication)
GET /api/items/purchases: Get items purchased by the user (requires authentication)
```
Project Structure

```
olx-clone/
├── Backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── itemController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Item.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── itemRoutes.js
│   ├── .env
│   └── server.js
└── Frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── App.js
    │   └── index.js
    └── package.json
```
![Screenshot (213)](https://github.com/user-attachments/assets/a7470013-f43a-4ab8-bb54-542396c30611)
![Screenshot (210)](https://github.com/user-attachments/assets/dd6414a3-e23a-40eb-9169-010a68055810)
![Screenshot (211)](https://github.com/user-attachments/assets/c7c67c16-e231-4471-ae9a-8024dec179f0)
![Screenshot (214)](https://github.com/user-attachments/assets/2f9c951c-7355-4f54-bb6c-fbca2d609ca6)


