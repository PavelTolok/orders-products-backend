const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const routes = require("./routes");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { typeDefs, resolvers } = require("./graphql");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://orders-products-backend-9lx4.onrender.com",
    methods: ["GET", "POST", "DELETE"],
  },
});

app.use(cors());
app.use(express.json());
app.use("/api", routes);

const gqlServer = new ApolloServer({ typeDefs, resolvers });

(async () => {
  await gqlServer.start();
  app.use(
    "/graphql", // GraphQL будет доступен по этому пути
    expressMiddleware(gqlServer)
  );
  console.log(`GraphQL server running at /graphql`);
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