const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();
const connectDB = require("./config/db");
const app = express();
const server = http.createServer(app);

connectDB();

// CORS Middleware Configuration
const corsOptions = {
  origin: "*",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
};
app.use(cors(corsOptions));

// JSON Middleware for parsing request bodies
app.use(express.json());

// Socket.IO Configuration with CORS
const io = new Server(server, {
  cors: {
    origin: "*", // Match the origins allowed by Express CORS configuration
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Socket.IO Events
io.on("connection", (socket) => {
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`A user joined room: ${room}`);
  });

  socket.on("codeChange", (data, room) => {
    socket.to(room).emit("codeUpdate", data);
  });

  socket.on("leaveRoom", (room) => {
    socket.leave(room);
    console.log(`A user left room: ${room}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Import routes
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");
const likeRoutes = require("./routes/likeRoutes");
const jobRoutes = require("./routes/jobRoutes");
const followRoutes = require("./routes/followRoutes");
const showFollowRoutes = require("./routes/showFollowRoutes");
const extraRoutes = require("./routes/extraRoutes");
const doubtRouter = require("./routes/doubtRoutes");
const { compileCode } = require("./controllers/compileController");

// Route middlewares
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/blog/like", likeRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/showFollow", showFollowRoutes);
app.use("/api/extra", extraRoutes);
app.use("/api/doubts", doubtRouter);
app.use("/api/compile", compileCode);

// Error handling middleware
app.use(errorHandler);

// Server Listening
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
