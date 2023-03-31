import express, { Express, Request, Response} from "express"
import dotenv from "dotenv"
import { DataSource } from "typeorm"

// instantiate express app
const app: Express = express()
dotenv.config()

// create database connection
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: process.env.NODE_ENV !== "production"
})

// define server port
const port = process.env.PORT

// create a default route
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server Running")
})

// initialize data source and listen to the port
AppDataSource.initialize().then(() => {
  app.listen(port)
  console.log("Data Source has been initialized!")
}).catch((err) => {
  console.error("Error during Data Source initialization", err)
})
