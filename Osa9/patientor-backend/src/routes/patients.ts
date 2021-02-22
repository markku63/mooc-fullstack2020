import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
  if (req.params.id) {
    const patient = patientService.findById(req.params.id);
    if (patient) {
      res.send(patient);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const  addedPatient = patientService.addEntry(newPatient);
    res.json(addedPatient);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
})
export default router;