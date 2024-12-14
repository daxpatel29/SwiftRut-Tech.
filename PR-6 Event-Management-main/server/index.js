import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './Config/mongoose.js';
import authRoutes from './Routes/userRoutes.js';
import eventRoutes from './Routes/eventRoute.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://event-management-q1saufom3-pawarchandrakant29s-projects.vercel.app",
    ],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json()); 


connectDB();


app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

const port = process.env.PORT;


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
