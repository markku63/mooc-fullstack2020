import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { EntryFormValues } from './AddEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal: React.FC<Props> = ({ modalOpen, onClose, onSubmit, error }) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header></Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}

    </Modal.Content>
  </Modal>
);

export default AddEntryModal;