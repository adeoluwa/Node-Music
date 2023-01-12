import { ObjectId } from 'mongodb';

/* Defining the structure of the User object. */
export interface User {
  email: string;
  password: string;
  username: string;
}

export interface Song {
  userId: ObjectId;
  filename: string;
  mimeType: string;
  title: string;
  genre?: string;
  release?: Date;
  duration: number;
  lyrics?: string;
  uploaded: Date;
}
