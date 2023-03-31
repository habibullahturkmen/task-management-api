const express = require("express")

// instantiate express app
const app = express()

// define server port
const port = 3200

// create a default route
app.get("/", (req, res) => {
  res.send("Express + TypeScript Server")
})

// listen to the port
app.listen(port)