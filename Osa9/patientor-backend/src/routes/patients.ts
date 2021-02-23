import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  if (req.params.id) {
    const patient = patientService.findPatientById(req.params.id);
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
    const  addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    if(!req.params.id) {
      throw new Error('Missing id');
    }
    const newEntry = toNewEntry(req.body);
    const modifiedPatient = patientService.addEntryToPatient(req.params.id, newEntry);
    res.json(modifiedPatient);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});
export default router;