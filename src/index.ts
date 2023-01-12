/* Importing the dotenv package. */
import dotenv from 'dotenv';

/* Loading the environment variables from the .env file. */
dotenv.config();

import express, { Request, Response } from 'express';

import { connectToServer } from './DB';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/auth", authRouter)

/* This is a route handler. It is a function that is called when a request is made to the root path of
the server. */
app.get('/', (req, res) => {
  res.send('Hey there!');
});

app.use((err: Error, req: Request, res: Response) => {
  res.status(500).json({ message: err?.message });
});

connectToServer().then(async () => {
  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
});
