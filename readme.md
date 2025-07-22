# 🎬 MovieFlix - Ticket Booking Application 🍿

A full-stack movie ticket booking application built with React, Node.js, Express, and MongoDB.

## ✨ Features

- 🔐 User authentication (register, login, email verification)
- 🎥 Browse movies with details (title, description, rating, etc.)
- 🕒 View show times and available seats
- 💺 Interactive seat selection system
- 💳 Online payment integration (Razorpay)
- 📝 Booking history and digital receipts
- 📱 Fully responsive design
- 🔔 Real-time notifications
- ✉️ Email confirmations

## 🛠️ Tech Stack

### Frontend
- ⚛️ React.js
- 🎨 Tailwind CSS
- 🔄 React Router
- 📡 Axios for API calls
- 🔐 JWT Authentication
- 🔥 React Hot Toast

### Backend
- 🚀 Node.js
- ⚡ Express.js
- 🍃 MongoDB (with Mongoose)
- 🔑 Bcrypt for password hashing
- ✉️ Nodemailer for email services
- 💸 Razorpay for payments
- 🛡️ JWT for authentication

## 📂 Project Structure

```
ticket-booking-app/
├── client/          # Frontend React application
│   ├── src/
│   │   ├── components/  # All React components
│   │   ├── context/     # Auth context
│   │   └── utils/       # API utilities
│   └── vite.config.js   # Vite configuration
│
├── server/          # Backend Node.js application
│   ├── models/      # MongoDB models
│   ├── routes/      # API routes
│   ├── middleware/  # Auth middleware
│   └── config/      # Database configuration
│
└── README.md        # You are here!
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Razorpay account (for payments)
- Gmail account (for email services)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/roshansuthar1105/CSI-ticket-booking.git
   cd CSI-ticket-booking
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   ```

3. **Set up the frontend**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment variables**
   Create a `.env` file in the server directory with:
   ```
   MONGODB_URI=mongodb://localhost:27017/ticket-booking
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   CLIENT_URL=http://localhost:3000
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```

### Running the Application

1. **Start the backend**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the frontend**
   ```bash
   cd ../client
   npm run dev
   ```

3. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 🌟 Screenshots

![Home Page](https://via.placeholder.com/800x500?text=MovieFlix+Home+Page)
![Movie Details](https://via.placeholder.com/800x500?text=Movie+Details+Page)
![Booking Page](https://via.placeholder.com/800x500?text=Seat+Selection+Page)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

Roshan Suthar - Roshansuthar2023@gmail.com

Project Link: [https://github.com/roshansuthar1105/CSI-ticket-booking](https://github.com/roshansuthar1105/CSI-ticket-booking)
