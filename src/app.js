import express from 'express';
import cors from 'cors';
import mainRoutes from './routes/main.routes.js';
import { connectMongoDB } from './config/db.js';//YOU CAN REMOVE THIS TO RUN LOCALY WITHOUT ANY DB

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
app.use('/api', mainRoutes);
app.get('/', (req, res) => {
  res.send('welcome to server ✅');
});
connectMongoDB();//YOU CAN REMOVE THIS TO RUN LOCALY WITHOUT ANY DB
export default app;
