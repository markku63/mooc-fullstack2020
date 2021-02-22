import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Header, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';

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
        dispatch({ type: 'UPDATE_PATIENT', payload: patientFromApi});
      } catch (e) {
        console.error(e);
      }
    }
    // SSN isn't in the public patient data, only in individual details
    if (!patient || !patient.ssn) {
      fetchPatientDetail();
    }
  }, [id, patient]);

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
    </Container>
  )
};

export default PatientDetailPage;