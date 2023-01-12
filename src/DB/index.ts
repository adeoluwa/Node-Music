/* Importing the Db and MongoClient classes from the mongodb package. */
import { Db, MongoClient } from 'mongodb';

/* Getting the connection string from the environment variable ATLAS_URL. */
const connectionString = process.env.ATLAS_URL;
/* Creating a new MongoClient object. */

const client = new MongoClient(connectionString);

/* Declaring a variable called db of type Db. */
let db: Db;

/**
 * ConnectToServer() is an async function that connects to the MongoDB server and returns a promise.
 */
export const connectToServer = async () => {
  await client.connect();
  db = client.db(process.env.DB_NAME);
  console.log('Successfully connected to MongoDB');
};

/**
 * GetDb returns the value of the db variable.
 */
const getDb = () => db;

/* Exporting the getDb function. */
export default getDb;
