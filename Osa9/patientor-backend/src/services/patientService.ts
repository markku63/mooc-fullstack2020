import patientData from '../../data/patients';
import { NonSensitivePatient } from '../types';

const patients: Array<NonSensitivePatient> = patientData;

const getEntries = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addEntry = (): null => {
  return null;
};

export default {
  getEntries,
  addEntry
};