import React from "react";
import axios from "axios";
import { Container, Table, Icon } from "semantic-ui-react";
import {useParams} from 'react-router'
import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddEntryModel from "../AddEntryModel";
import { Patient, Gender } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue, updatePatient } from "../state";

const GenderIcon = ({gender}: {gender: Gender}): JSX.Element => {
    if (gender === 'Female') return <Icon name='venus' />;
    if (gender === 'Male') return <Icon name='mars' />;
    if (gender === 'Other') return <Icon name='venus mars' />;

const PatientPage = () => {
    const [{ patients }, dispatch] = useStateValue();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const { id } = useParams<{ id: string }>();
    const patient = patients[id];
    if (!patient) return <div>No data</div>;

    const fetchData = async (id: string) => {
        try {
          const { data: patient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(updatePatient(patient));
        } catch (e) {
          console.error(e);
        }
      };
    
    return (
        <div>
          <h2>{patient.name} <GenderIcon gender={patient.gender}/></h2>
          <div>ssn: {patient.ssn}</div>
          <div>occupation: {patient.occupation}</div>
          <h3>Entries</h3>
          <AddEntryModal
            modalOpen={modalOpen}
            onClose={closeModal}
            onSubmit={submitNewEntry}
            error={error}
          />
          <Button onClick={() => openModal()}>Add New Entry</Button>
          {patient.entries?.map(entry => 
            <EntryDetails key={entry.id} entry={entry} />
          )}
        </div>
      );
    };
}

export default PatientPage
//
import React from "react";
import axios from "axios";
import { Container, Table, Button } from "semantic-ui-react";

import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue } from "../state";

const PatientListPage = () => {
  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        values
      );
      dispatch({ type: "ADD_PATIENT", payload: newPatient });
      closeModal();
    } catch (e) {
      console.error( 'Unknown Error');
      setError('Unknown error');
    }
  };

  return (
    <div className="App">
      <Container textAlign="center">
        <h3>Patient list</h3>
      </Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Gender</Table.HeaderCell>
            <Table.HeaderCell>Occupation</Table.HeaderCell>
            <Table.HeaderCell>Health Rating</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(patients).map((patient: Patient) => (
            <Table.Row key={patient.id}>
              <Table.Cell>{patient.name}</Table.Cell>
              <Table.Cell>{patient.gender}</Table.Cell>
              <Table.Cell>{patient.occupation}</Table.Cell>
              <Table.Cell>
                <HealthRatingBar showText={false} rating={1} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Patient</Button>
    </div>
  );
};

export default PatientListPage;