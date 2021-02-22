import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Header, Icon, List, Segment } from 'semantic-ui-react';
import { useStateValue, updatePatient } from '../state';
import { Patient, Entry, OccupationalHealthcareEntry, HospitalEntry, HealthCheckEntry, HealthCheckRating } from '../types';
import { apiBaseUrl } from '../constants';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  const [{ diagnoses}] = useStateValue();
  return (
    <Segment>
      <Header as='h3'>{entry.date} <Icon name='hospital' /></Header>
      <em>{entry.description}</em>
      <List bulleted>
        {entry.diagnosisCodes?.map(diag => (
          <List.Item>
            {diag} {Object.values(diagnoses).find(p => p.code === diag)?.name}
          </List.Item>
        ))}
      </List>
      <Container fluid>Discharged from hospital: {entry.discharge.date} reason: {entry.discharge.criteria}</Container>
    </Segment>
  );
};

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const [{ diagnoses}] = useStateValue();
  let heartColor: 'green'|'yellow'|'orange'|'red'|undefined;
  switch (entry.healthCheckRating) {
    case HealthCheckRating.Healthy:
      heartColor = 'green';
      break;
    case HealthCheckRating.LowRisk:
      heartColor = 'yellow';
      break;
    case HealthCheckRating.HighRisk:
      heartColor = 'orange';
      break;
    case HealthCheckRating.CriticalRisk:
      heartColor = 'red';
      break;
    default:
      break;
  }
  return (
    <Segment>
      <Header as='h3'>{entry.date} <Icon name='user md' /></Header>
      <em>{entry.description}</em>
      <List bulleted>
        {entry.diagnosisCodes?.map(diag => (
          <List.Item>
            {diag} {Object.values(diagnoses).find(p => p.code === diag)?.name}
          </List.Item>
        ))}
      </List>
      <Icon name='heart' color={heartColor} />
    </Segment>
  );
};

const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  const [{ diagnoses}] = useStateValue();
  return (
    <Segment>
      <Header as='h3'>{entry.date} <Icon name='stethoscope'/> {entry.employerName}</Header>
      <em>{entry.description}</em>
      <List bulleted>
        {entry.diagnosisCodes?.map(diag => (
          <List.Item>
            {diag} {Object.values(diagnoses).find(p => p.code === diag)?.name}
          </List.Item>
        ))}
      </List>
      {entry.sickLeave && <Container fluid>Sickleave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</Container> }
    </Segment>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
  case "Hospital":
    return <Hospital entry={entry} />;
  case "HealthCheck":
    return <HealthCheck entry={entry} />;
  case "OccupationalHealthcare":
    return <OccupationalHealthcare entry={entry} />;
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