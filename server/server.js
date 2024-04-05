const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();
const connectDB = require("./config/db");
const app = express();
const server = http.createServer(app);
const axios = require("axios");
connectDB();
// Middleware
app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: ["https://gbtc-hazel.vercel.app/"],
  })
);

//Socket
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

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

const corsOptions = {
  origin: "*",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
};
app.use(cors(corsOptions));

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const blogRoutes = require("./routes/blogRoutes");
app.use("/api/blog", blogRoutes);

const commentRoutes = require("./routes/commentRoutes");
app.use("/api/comment", commentRoutes);

const likeRoutes = require("./routes/likeRoutes");
app.use("/api/blog/like", likeRoutes);

const jobRoutes = require("./routes/jobRoutes");
app.use("/api/job", jobRoutes);

const followRoutes = require("./routes/followRoutes");
app.use("/api/follow", followRoutes);

const showFollowRoutes = require("./routes/showFollowRoutes");
app.use("/api/showFollow", showFollowRoutes);

const extraRoutes = require("./routes/extraRoutes");
app.use("/api/extra", extraRoutes);
// Error handling middleware
app.use(errorHandler);

const doubtRouter = require("./routes/doubtRoutes");
app.use("/api/doubts", doubtRouter);

const { compileCode } = require("./controllers/compileController");
app.use("/api/compile", compileCode);

// Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
