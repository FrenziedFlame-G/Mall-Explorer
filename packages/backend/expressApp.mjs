import cors from 'cors';
import express from 'express';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

export default app;