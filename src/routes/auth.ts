import express, { Router } from 'express';

import getDb from '../DB';

import { User } from '../DB/types';

import bcrypt from 'bcrypt';

// import { Jwt } from 'jsonwebtoken';

const router = express.Router();

/* This is a route handler for the /register route. It is using the async/await syntax to handle
asynchronous code. It is using the bcrypt library to hash the password before saving it to the
database. */
router.post('/register', async (req, res) => {
  const db = getDb();
  /* Creating a collection in the database called user. */
  const users = db.collection<User>('user');

  /* Hashing the password that was sent in the request body. */
  const password = await bcrypt.hash(req.body.password, 10);

  /* Inserting a new user into the database. */
  await users.insertOne({
    email: req.body.email,
    password,
    username: req.body.username,
  });

  res.status(200).json({ message: 'Register successfully' });
});

/* This is a route handler for the /login route. It is using the async/await syntax to handle
asynchronous code. It is using the bcrypt library to compare the password with the hashed password
in the database. If the password is valid, it will generate a JWT token and send it back to the
client. */
router.post('/login', async (req, res) => {
  const db = getDb();
  const users = db.collection<User>('user');

 /* Finding a user in the database with the email that was sent in the request body. */
  const user = await users.findOne({
    email: req.body.email,
  });

  const passwordValid = await bcrypt.compare(req.body.password, user.password);

  /* This is checking if the user is null or the password is not valid. If either of these are true, it
  will return a 401 status code and a message saying that the email or password is incorrect. */
  if (user === null || !passwordValid) {
    return res.status(401).json({
      accessToken: null,
      message: 'Email or password is incorrect',
    });
  }

  /* Generating a JWT token. */
  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  /* Sending a response back to the client with a status code of 200 and a JSON object with the
  accessToken. */
  res.status(200).json({ accessToken });
});

export default router;
