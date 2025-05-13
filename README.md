# Twitter Clone

A full-stack Twitter clone application with real-time updates, user authentication, and core Twitter functionalities.

## Features 

- User authentication (signup, login, logout)
- Create, read, update, and delete tweets
- Like and retweet functionality
- User profiles with avatar and bio
- Follow/unfollow users
- Real-time updates for new tweets and notifications
- Responsive design for mobile and desktop

## Tech Stack

### Frontend
- React.js 
- TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB for database
- JWT for authentication
- Socket.io for real-time updates

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository
```bash
git clone https://github.com/gurusintechlabs/twitter-clone.git
cd twitter-clone
```

2. Install dependencies for frontend and backend
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables
   - Create a `.env` file in the backend directory
   - Add the following variables:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/twitter-clone
     JWT_SECRET=your_jwt_secret
     ```

4. Run the application
```bash
# Run backend
cd backend
npm run dev

# Run frontend (in a separate terminal)
cd frontend
npm start
```

## Project Structure

```
twitter-clone/
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── pages/
│       ├── App.tsx
│       └── index.tsx
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── index.js
│   └── package.json
└── README.md
```

## License

This project is licensed under the MIT License.
