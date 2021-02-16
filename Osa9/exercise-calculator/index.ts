import express from 'express';
import { calculateBmi } from './bmicalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    let bmi: string;
    if (!isNaN(height) && !isNaN(weight)) {
      bmi = calculateBmi(height, weight);
      res.json({
        height,
        weight,
        bmi
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(400).json({ error: 'malformatted parameters'});
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});