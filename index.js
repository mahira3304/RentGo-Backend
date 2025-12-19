import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

// Routers
import authRouter from './routers/auth.js';
import adminRouter from './routers/admin.js';
import userRouter from './routers/user.js';
import publicRouter from './routers/public.js';

// Middlewares
import { adminOnly, userOnly } from './middlewares/auth.js';

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

app.use('/', authRouter);
app.use('/public', publicRouter);
app.use('/admin', adminOnly, adminRouter);
app.use('/user', userOnly, userRouter);

const PORT = 3000;
app.listen(PORT, () => {
    connectDB();
    connectCloudinary();
    console.log('App started!!');
});
