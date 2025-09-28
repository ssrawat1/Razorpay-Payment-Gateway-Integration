import express from 'express';
import data from './courses.json' with { type: 'json' };
import cors from 'cors';
import rzpRoutes from './routes/rzpRoutes.js';

const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.json(data);
});

app.use('/rzp', rzpRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`server is running on address, http://localhost:${PORT}`);
});
