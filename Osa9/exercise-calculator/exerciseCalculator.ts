interface TrainingResult {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

interface ExerciseValues {
  dailyExercises: Array<number>;
  target: number
}

export const calculateExercises = (dailyExercises: Array<number>, target: number): TrainingResult => {
  const periodLength = dailyExercises.length;
  if (periodLength === 0) throw new Error('Empty exercise table');
  const trainingDays = dailyExercises.reduce((total, curr) => { return (curr > 0 ? total + 1 : total);}, 0);
  const average = dailyExercises.reduce((total, curr) => total + curr, 0) / periodLength;
  const success = average >= target;
  let rating: number;
  let ratingDescription: string;
  if (success) {
    rating = 3;
    ratingDescription = 'Excellent! Continue training at this level';
  } else if (average >= 0.75 * target) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'you really should work harder';
  }
  return {periodLength, trainingDays, target, average, success, rating, ratingDescription};
};

const parseTrainingArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2]))) {
    const target = Number(args[2]);
    const dailyExercises: Array<number> = [];
    for (const s of args.slice(3)) {
      const n = Number(s);
      if (isNaN(n)) {
        throw new Error('Provided values were not numbers!');
      } else {
        dailyExercises.push(n);
      }
    }
    return {
      dailyExercises,
      target
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const {dailyExercises, target} = parseTrainingArguments(process.argv);
  console.log(calculateExercises(dailyExercises, target));
} catch (e: unknown) {
  console.log('Error:', e.message);
}