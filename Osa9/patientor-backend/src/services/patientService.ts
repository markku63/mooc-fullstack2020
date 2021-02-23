import { v4 as uuidv4 } from 'uuid';
import patientData from '../../data/patients';
import { NonSensitivePatient, NewPatient, Patient, Entry } from '../types';

const patients: Array<Patient> = patientData;

const getPatients = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findPatientById = ( id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = ( patient: NewPatient ): Patient => {
  const newPatient = {
    id: uuidv4(),
    entries: [],
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntryToPatient = ( patientId: string, entry: Entry ): Patient => {
  const patientToModify = patients.find(p => p.id === patientId);
  if (!patientToModify) {
    throw new Error(`Patient with id ${patientId} not found`);
  }
  
  patientToModify.entries.push(entry);
  return patientToModify;
};

export default {
  getPatients,
  findPatientById,
  addPatient,
  addEntryToPatient
};