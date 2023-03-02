import express from "express";
import * as trpc from "@trpc/server"
import * as trpcExpress from "@trpc/server/adapters/express"


// Creating our router ; here we are creating a query route because we want to send(query) data to the client
const appRouter = trpc.router().query("Hello", {
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
