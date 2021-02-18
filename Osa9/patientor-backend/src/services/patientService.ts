import { v4 as uuidv4 } from 'uuid';
import patientData from '../../data/patients';
import { NonSensitivePatient, NewPatient, Patient } from '../types';

const patients: Array<Patient> = patientData;

const getEntries = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = ( id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
}

const addEntry = ( entry: NewPatient ): Patient => {
  const newEntry = {
    id: uuidv4(),
    entries: [],
    ...entry
  };
  patients.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  findById,
  addEntry
};