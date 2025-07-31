import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import auth from "./routes/auth.js";
import todos from "./routes/todos.js";
import categories from "./routes/categories.js";
const app = express();

// Allow multiple origins, including local and both Vercel deployments
const allowedOrigins = [
  process.env.CLIENT_URL,
  "https://taskflow-sagar.vercel.app",
  "https://taskflow-indol-six.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// routes
app.use('/api/auth', auth);
app.use('/api/todos', todos);
app.use('/api/categories', categories);

export { app };
