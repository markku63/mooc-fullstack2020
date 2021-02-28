import React from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";

export type TypeOption = {
  value: "HealthCheck" | "OccupationalHealthcare" | "Hospital";
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: TypeOption[];
};

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options
}: SelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);