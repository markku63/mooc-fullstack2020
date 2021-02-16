import express from 'express';
import { calculateBmi } from './bmicalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    if (daily_exercises && target) {
      res.json(calculateExercises(daily_exercises, target));
    } else {
      res.status(400).json({ error: "parameters missing" });
    }
  } catch (error) {
    res.status(400).json({ error: 'malformatted parameters'});
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});