import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Header, Icon } from 'semantic-ui-react';
import { useStateValue } from "../state";

const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = useState(Object.values(patients).find(p => p.id === id));
  let genderIcon: 'man'|'woman'|'other gender';

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
    </Container>
  )
};

export default PatientDetailPage;