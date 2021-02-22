import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Header, Icon, List, Segment } from 'semantic-ui-react';
import { useStateValue, updatePatient } from '../state';
import { Patient, Entry } from '../types';
import { apiBaseUrl } from '../constants';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses}] = useStateValue();
  return (
    <Segment>
      {entry.date} <em>{entry.description}</em>
      <List bulleted>
        {entry.diagnosisCodes?.map(diag => (
          <List.Item>
            {diag} {Object.values(diagnoses).find(p => p.code === diag)?.name}
          </List.Item>
        ))}
      </List>
    </Segment>
  );
};

const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses}] = useStateValue();
  return (
    <Segment>
      {entry.date} <em>{entry.description}</em>
      <List bulleted>
        {entry.diagnosisCodes?.map(diag => (
          <List.Item>
            {diag} {Object.values(diagnoses).find(p => p.code === diag)?.name}
          </List.Item>
        ))}
      </List>
    </Segment>
  );
};

const OccupationalHealthcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses}] = useStateValue();
  return (
    <Segment>
      {entry.date} <em>{entry.description}</em>
      <List bulleted>
        {entry.diagnosisCodes?.map(diag => (
          <List.Item>
            {diag} {Object.values(diagnoses).find(p => p.code === diag)?.name}
          </List.Item>
        ))}
      </List>
    </Segment>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
  case "Hospital":
    return <HospitalEntry entry={entry} />;
  case "HealthCheck":
    return <HealthCheckEntry entry={entry} />;
  case "OccupationalHealthcare":
    return <OccupationalHealthcareEntry entry={entry} />;
  default:
    return assertNever(entry);
  }
};

const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient|undefined>(Object.values(patients).find(p => p.id === id));
  let genderIcon: 'man'|'woman'|'other gender';

  useEffect(() => {
    const fetchPatientDetail = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        setPatient(patientFromApi);
        dispatch(updatePatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    }
    // SSN isn't in the public patient data, only in individual details
    if (!patient || !patient.ssn) {
      fetchPatientDetail();
    }
  }, [id, patient, dispatch]);

  if (!patient) {
    return null;
  }

  switch (patient.gender) {
    case 'male':
      genderIcon = 'man';
      break;
    case 'female':
      genderIcon = 'woman';
      break;
    case 'other':
    default:
      genderIcon = 'other gender';
      break;
  }
  return (
    <Container>
      <Header as='h2'>
        {patient.name}
       <Icon name={genderIcon} />
      </Header>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <div>date of birth: {patient.dateOfBirth}</div>
      <Header as='h3'>
        entries
      </Header>
      {patient.entries?.map(entry => (
        <EntryDetails entry={entry} />
      ))}
    </Container>
  )
};

export default PatientDetailPage;