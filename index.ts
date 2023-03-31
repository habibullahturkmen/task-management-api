import express, { Express } from "express"
import { DataSource } from "typeorm"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import cors from "cors"

import { Task } from "./src/tasks/tasks.entity"
import { tasksRouter } from "./src/tasks/tasks.router"

// instantiate express app
const app: Express = express()
dotenv.config()

// parse request body
app.use(bodyParser.json())

// use CORS
let corsOptions = {
  origin: process.env.FRONTEND,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

// create database connection
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [Task],
  synchronize: process.env.NODE_ENV !== "production"
})

// define server port
const port = process.env.PORT

// initialize data source and listen to the port
AppDataSource.initialize().then(() => {
  app.listen(port)
  console.log("Data Source has been initialized!")
}).catch((err) => {
  console.error("Error during Data Source initialization", err)
})

app.use("/", tasksRouter)