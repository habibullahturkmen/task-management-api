import express, { Express, Request, Response} from "express"
import dotenv from "dotenv"

// instantiate express app
const app: Express = express()
dotenv.config()

// define server port
const port = process.env.PORT

// create a default route
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server Running")
})

// listen to the port
app.listen(port)