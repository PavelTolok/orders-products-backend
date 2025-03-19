const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const routes = require("./routes");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefs, resolvers } = require("./graphql");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
  },
});

app.use(cors());
app.use(express.json());
app.use("/api", routes);

// GraphQL сервер
const gqlServer = new ApolloServer({ typeDefs, resolvers });
(async () => {
  const { url } = await startStandaloneServer(gqlServer, {
    listen: { port: 4000 },
  });
  console.log(`GraphQL server running at ${url}`);
})();

let activeSessions = 0;
io.on("connection", (socket) => {
  activeSessions++;
  io.emit("sessionCount", activeSessions);
  socket.on("disconnect", () => {
    activeSessions--;
    io.emit("sessionCount", activeSessions);
  });
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`REST server running on port ${PORT}`);
});
