# The Swarovski Auction - Real-Time Bidding Platform

*An interactive online auction platform where users can create auctions, browse listings, and bid in real-time with live updates for all participants.*

**The Swarovski Auction** is a full-stack web application that allows users to participate in live auctions. Whether you're looking to sell items or find great deals through competitive bidding, this platform provides a seamless, real-time bidding experience.

## Overview

---
This README provides:
- ✅ **Non-technical explanation** - How the app works for end users
- ✅ **Technical architecture** - System diagrams and data flows
- ✅ **Project structure** - Clear organization of files and folders
- ✅ **Communication patterns** - Detailed explanations of how components interact
- ✅ **Security information** - Key security features explained
- ✅ **Setup instructions** - How to install and run the project
- ✅ **Professional formatting** - Clear sections and formatting
---

### Key Features

- 🔐 **Secure Authentication** - Register and log in with encrypted passwords
- 🏷️ **Create Auctions** - List items with images, descriptions, and starting prices
- 💰 **Live Bidding** - Place bids and watch the price update in real-time
- 👀 **Live Updates** - All users see price changes instantly as bids are placed
- ⏱️ **Time-Limited Auctions** - Auctions have defined end times
- 🛡️ **Fair System** - Users cannot bid on their own auctions

---

## For Non-Technical Users

### How It Works

1. **Sign Up** - Create an account with a username and password
2. **Create an Auction** - Add an item with a title, description, image, starting price, and end time
3. **Browse Auctions** - View all active auctions on the platform
4. **Place a Bid** - Enter a bid amount higher than the current price
5. **Win or Keep Trying** - The highest bidder when the auction ends wins the item

### Real-Time Experience

When you view an auction, you'll see live updates as other users place bids. If someone outbids you, you'll see the price update instantly—no need to refresh the page!

---

## Technical Architecture

### System Overview

The application follows a **client-server architecture** with separate frontend and backend applications:
```bash
┌─────────────────────────────────────────────────────────┐
│ Frontend (Browser) │
│ • Vite + TypeScript │
│ • User Interface (HTML, CSS, JavaScript) │
│ • Real-time Socket.io Client │
└────────────────────┬────────────────────────────────────┘
│
┌────────────┴────────────┐
│ │
HTTP/REST WebSocket (Socket.io)
├─ Register ├─ Join Auction
├─ Login ├─ Place Bid
├─ Fetch Auctions └─ Receive Updates
└─ Create Auction
│ │
└────────────┬────────────┘
│
┌────────────▼─────────────┐
│ Backend (Node.js) │
│ • Express.js Server │
│ • Socket.io Server │
└────────────┬─────────────┘
│
┌────────────▼─────────────┐
│ MongoDB Database │
│ • Users │
│ • Auctions │
│ • Bidding History │
└──────────────────────────┘
```
### Technology Stack

#### Backend
- **Runtime**: Node.js with TypeScript
- **Web Framework**: Express.js
- **Real-Time Communication**: Socket.io
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcrypt for hashing

#### Frontend
- **Build Tool**: Vite
- **Language**: TypeScript
- **Real-Time Communication**: Socket.io Client
- **Storage**: Browser Local Storage for session data


### Project Structure

```bash
api/ # Backend Application
├── src/
│ ├── controllers/ # Business logic for routes
│ │ ├── auctionController.mts
│ │ ├── loginController.mts
│ │ └── registerController.mts
│ ├── routes/ # API endpoints
│ │ ├── auctionRouter.mts
│ │ ├── loginRouter.mts
│ │ └── registerRouter.mts
│ ├── models/ # Data schemas and DTOs
│ │ ├── auctionSchema.mts (MongoDB schema)
│ │ ├── userSchema.mts (MongoDB schema)
│ │ └── requests/ (Request validation types)
│ ├── middleware/ # Express middleware
│ │ └── auth.mts (JWT verification)
│ ├── services/
│ │ └── socketService.mts (Real-time bidding logic)
│ └── utils/ # Helper functions
│ ├── jwtUtils.mts (Token generation/verification)
│ └── validators.mts (Input validation)
├── index.mts # Server entry point
└── package.json

frontend/ # Frontend Application
├── src/
│ ├── handlers/ # Event handlers
│ │ ├── formHandlers.ts (Form submissions)
│ │ └── socketHandlers.ts (Real-time events)
│ ├── services/ # API & Data services
│ │ ├── api.ts (HTTP requests)
│ │ ├── socket.ts (Socket.io connection)
│ │ └── storage.ts (Local storage)
│ ├── ui/ # UI components
│ │ ├── auctionUI.ts (Auction display)
│ │ ├── messageUI.ts (Messages)
│ │ └── dom.ts (DOM utilities)
│ ├── models/ # TypeScript types
│ │ ├── types.ts
│ │ └── User.ts
│ ├── main.ts # Frontend entry point
│ └── style.css # Styling
└── package.json
```

### How Components Communicate

#### 1. **User Authentication Flow**

User Input (Register/Login)
↓
Frontend Form Handler
↓
HTTP POST to Backend (/register or /login)
↓
Backend Controller (validates, hashes password, creates user)
↓
Backend creates JWT token
↓
Response with token stored in cookie
↓
Frontend stores in localStorage and authenticated

#### 2. **Auction Browsing Flow**

User loads auction page
↓
Frontend requests: GET /auctions
↓
Backend queries MongoDB for all auctions
↓
Backend converts data to DTOs (Data Transfer Objects)
↓
Returns list to frontend
↓
Frontend displays auctions

#### 3. **Real-Time Bidding Flow**

User selects auction
↓
Frontend establishes WebSocket connection via Socket.io
↓
Frontend emits: "joinAuction" event with auction ID
↓
Backend adds user to auction room
↓
Backend sends back current auction info
↓
User places bid
↓
Frontend emits: "placeBid" event (amount + auction ID)
↓
Backend validates:
• User is logged in
• Bid is higher than current price
• Auction hasn't ended
• User doesn't own the auction
↓
If valid: Update database + Broadcast update to all users in room
If invalid: Send error message back to user
↓
All connected users receive updated auction info instantly

### Security Features

1. **Password Security** - Passwords are hashed using bcrypt before storage
2. **JWT Authentication** - Tokens verify user identity for protected routes
3. **CORS Protection** - Only allowed origins (frontend URL) can access the API
4. **Cookie Handling** - Authentication tokens stored securely in cookies
5. **Auction Protection** - Users cannot bid on their own auctions
6. **Input Validation** - All incoming data is validated before processing

### Key Database Models

#### User Schema
```ts
{
username: String (unique)
email: String
password: String (hashed)
createdAt: Date
}
```

#### Auction Schema

```ts
{
title: String
description: String
imageUrl: String
startingPrice: Number
currentPrice: Number
leadingBidder: String (username or null)
createdBy: String (creator's username)
endTime: Date
createdAt: Date
}
```

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB database (local or cloud)
- npm or yarn package manager

### Installation

#### Backend Setup
```bash
cd api
npm install
```

Create a ```.env``` file in the ```api``` directory:

```bash
MONGO_URL=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_secret_key
```

**Start the backend:**

```bash
npm run dev    # Development with hot-reload
npm run build  # Build TypeScript
npm run start  # Production
```

#### Frontend Setup

```bash
cd frontend
npm install
npm run dev    # Start development server (usually runs on http://localhost:5173)
```

**Development Workflow**
1. Start the backend API (```npm run dev``` in api)
2. Start the frontend dev server (```npm run dev``` in frontend)
3. Open browser to ```http://localhost:5173```
4. Register an account and start creating/bidding on auctions
---

#### API Endpoints

**Authentication**
- ```POST /register``` - Create new account
- ```POST /login``` - Log in and receive JWT token

**Auctions**
- ```GET /auctions``` - Fetch all auctions (requires auth)
- ```POST /auctions``` - Create new auction (requires auth)

**Real-Time (Socket.io Events)**
- ```joinAuction``` - Join an auction room for live updates
- ```placeBid``` - Submit a bid on an auction
- ```auctionInfo``` - Receive updated auction data
- ```bidError``` - Receive error messages

---

#### Authors
[Linda](https://github.com/whimsical-krobus)
[Farzad](https://github.com/farzad-sanaie)
[Karl](https://github.com/Crol91)

---

**License**

ISC