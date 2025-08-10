const express = require("express");
const cors = require("cors");
const session = require("express-session");

const apiRoutes = require("./routes/apiRoutes");


const app = express();

// 🛡️ Session & CORS Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json()); // To parse JSON requests
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "your_secret_key", // Use .env in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,        // Switch to true on HTTPS
    httpOnly: true,
    sameSite: "lax"
  }
}));

// 📦 Mount all API routes
app.use(express.json()); 
app.use("/api", apiRoutes);

// 🔊 Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
