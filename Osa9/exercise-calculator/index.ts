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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dailyExercises, target } = req.body;
  const result = calculateExercises(dailyExercises, target);
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});