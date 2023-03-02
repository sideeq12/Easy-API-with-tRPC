import express from "express";
import * as trpc from "@trpc/server"

const appRoouter = trpc.router().query("Hello", {
  resolve(){
    return "Hello world"
  }
})
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello from api-server");
});

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});
