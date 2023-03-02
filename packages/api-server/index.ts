import express from "express";
// import * as trpc from "@trpc/server"
const { createRouter } = require('@trpc/server');
import * as trpcExpress from "@trpc/server/adapters/express"


// Creating our router ; our endpoint to handle incoming request from the client
const appRouter = createRouter.query("Hello", {
  resolve(){
    return "Hello world"
  }
}).interop()
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({});

const app = express();


// Connecting our tRPC adapter to express
app.use("/trpc", 
trpcExpress.createExpressMiddleware({
  router : appRouter,
  // Context is used when you are dealing with somethings like authorizatio, 
  createContext
}))

// declaring the port on which our server is running
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello from api-server");
});

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});
