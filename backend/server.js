const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const usersRoutes = require("./routes/userRoute");
const worksRoutes = require("./routes/workRoute");
const categoryRoutes = require("./routes/categoryRoute");
const bodyParser = require("body-parser");

// Load environment variables from config file
dotenv.config({ path: "./config/config.env" });

// Express app initialization
const app = express();

// Define a whitelist of allowed origins
var whitelist = [
  "http://localhost:8999",
  "http://localhost:5500",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
];

// Configure CORS options
var corsOptions = {
  origin: function (origin, callback) {
    if (origin === undefined || whitelist.indexOf(origin) !== -1) {
      // Allow requests from whitelisted origins
      callback(null, true);
    } else {
      // Deny requests from other origins
      callback(new Error("Not allowed by CORS"));
    }
  },
  
  allowedHeaders: "Authorization, Set-Cookie, Content-Type",
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
};

// Enable CORS middleware using the configured options
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Cookie байвал req.cookie рүү оруулж өгнө
app.use(cookieParser());

app.use(bodyParser.json({ limit: "10000kb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10000kb", extended: true }));
// Body parser middleware
app.use(express.json());
// Routes
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/works", worksRoutes);
app.use("/api/v1/category", categoryRoutes);

const PORT = process.env.PORT || 8080;

// MongoDB connection
connectDB()
  .then(() => {
    console.log("MongoDB Connected");

    // Start the server after MongoDB connection is established
    const server = app.listen(PORT, () =>
      console.log(`EXPRESS --> Server is running on port ${PORT}`)
    );

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (err, promise) => {
      console.error(`Unhandled Rejection: ${err.message}`);
      server.close(() => {
        process.exit(1); // Exit process with failure
      });
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1); // Exit process with failure
  });
