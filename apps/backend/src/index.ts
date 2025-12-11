  import express, { Router } from 'express';
  import cors from 'cors';
  import dotenv from 'dotenv';
  dotenv.config();
  import chatRouter from './routes/chat';

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const port = 3000;

  const router = Router();

  router.use('/chat', chatRouter);

  app.use('/api', router);

  app.get('/', (req, res) => {
    res.send('Hello from TypeScript Node.js Server!');
  });

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });