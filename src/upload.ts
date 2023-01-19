import multer from 'multer';

import { GridFsStorage } from 'multer-gridfs-storage';

import router from './routes/auth';

import asyncHandler from 'express-async-handler';
 
import getDb from './DB';

import { Request, Response} from "express"


import { Song } from './DB/types';

const storage = new GridFsStorage({ url: process.env.ATLAS_URL });

const upload = multer({ storage });

export default upload;

router.post(
  '/',
  upload.single('song'),
  asyncHandler(async (req: Request, res: Response) => {
    const db = getDb();
    const collection = db.collection<Song>('song');
    if (!req.file?.filename) {
      res.status(400).send('File not uploaded');
      return;
    }

    const result = await collection.insertOne({
      userId: req?.auth.id,
      filename: req.file.filename,
      mimeType: req.file.mimetype,
      title: req.body.title,
      duration: req.body.duration,
      genre: req.body.genre,
      lyrics: req.body.lyrics,
      uploaded: new Date(),
    });

    res.status(200).json(result);
  })
);
