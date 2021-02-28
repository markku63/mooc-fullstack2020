import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, NumberField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { Entry } from "../types";
export type EntryFormValues = Omit<Entry, "id">;
import { TypeOption, SelectField } from "./FormField";
import { useStateValue } from "../state";

const TypeOptions: TypeOption[] = [
  { value: "HealthCheck", label: "Health check" },
  { value: "OccupationalHealthcare", label: "Occupational health care" },
  { value: "Hospital", label: "Hospital visit" }
];

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
};

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  const now = new Date();
  const datestring = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;

  return (
    <Formik
      initialValues={{
        type: 'HealthCheck',
        description: '',
        date: datestring,
        specialist: ''
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Type"
              name="type"
              options={TypeOptions}
            />
            <Field
              label="description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
          </Form>
        )
      }}
    </Formik>
  )
};