/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/explicit-module-boundary-types */
import { NewPatient, Gender, Entry, HealthCheckRating, EntryType, Discharge, Diagnose, DateRange } from './types';
import { v4 as uuidv4 } from 'uuid';
import diagnoseService from './services/diagnoseService';

const diagnosisCodeSet = new Set(diagnoseService.getEntries().map(d => d.code));

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isDateRange = (daterange: any): daterange is DateRange => {
  return (
    daterange
    && typeof daterange === 'object'
    && 'startDate' in daterange
    && 'endDate' in daterange
    && isDate(daterange['startDate'])
    && isDate(daterange['endDate'])
  );
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return !isNaN(Number(param)) && Object.values(HealthCheckRating).includes(param);
};

const isEntryType = (param: any): param is EntryType => {
  return isString(param) && (param === "HealthCheck" || param === "OccupationalHealthcare" || param === "Hospital");
};

const isDiagnosisCodes = (param: any): param is Array<Diagnose['code']> => {
  return (
    Array.isArray(param)
    && param.length > 0
    && isString(param[0])
    && param.every(p => diagnosisCodeSet.has(p))
  );
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }
  return name;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseSsn = (ssn: any): string => {
  if(!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing Social Security Number: ${ssn}`);
  }
  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }
  return occupation;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${description}`);
  }
  return description;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist: ${specialist}`);
  }
  return specialist;
};

const parseType = (type: any): EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error(`Incorrect or missing type: ${type}`);
  }
  return type;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!isHealthCheckRating(rating)) {
    throw new Error(`Incorrect or missing health check rating: ${rating}`);
  }
  return rating;
};

const parseCriteria = (criteria: any): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error(`Incorrect or missing discharge criteria: ${criteria}`);
  }
  return criteria;
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge) {
    throw new Error('Missing discharge data');
  }
  return { date: parseDate(discharge.date), criteria: parseCriteria(discharge.criteria) };
};

const parseEmployer = (employer: any): string => {
  if (!employer || !isString(employer)) {
    throw new Error(`Incorrect or missing employer: ${employer}`);
  }
  return employer;
};

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnose['code']> | undefined => {
  if (!diagnosisCodes || !isDiagnosisCodes(diagnosisCodes)) {
    return undefined;
  }
  return diagnosisCodes;
};

const parseSickleave = (sickLeave: any): DateRange | undefined => {
  if (!sickLeave || !isDateRange(sickLeave)) {
    return undefined;
  }
  return sickLeave;
};

export const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };
  return newPatient;
};

export const toNewEntry = (object: any): Entry => {
  let newEntry: Entry;
  const description = parseDescription(object.description);
  const date = parseDate(object.date);
  const specialist = parseSpecialist(object.specialist);
  const type = parseType(object.type);
  const diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  switch (type) {
    case "HealthCheck":
      newEntry = {
        id: uuidv4(),
        type,
        date,
        specialist,
        description,
        diagnosisCodes,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
      break;
    case "Hospital":
      newEntry = {
        id: uuidv4(),
        type,
        date,
        specialist,
        description,
        diagnosisCodes,
        discharge: parseDischarge(object.discharge),
      };
      break;
    case "OccupationalHealthcare":
      newEntry = {
        id: uuidv4(),
        type,
        date,
        specialist,
        description,
        diagnosisCodes,
        employerName: parseEmployer(object.employerName),
        sickLeave: parseSickleave(object.sickLeave),
      };
      break;
  
    default:
      throw new Error("Unhandled entry type");
  }
  return newEntry;
};