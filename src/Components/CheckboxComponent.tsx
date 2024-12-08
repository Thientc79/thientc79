import React from 'react';
import { Form } from 'react-bootstrap';
type  CheckboxProps = {
    label?: string; // The label for the checkbox
    checked: boolean; // Checkbox state (checked or not)
    onChange: (checked: boolean) => void; // Callback when checkbox state changes
    disabled?: boolean; // If true, the checkbox is disabled
    id?: string; // Optional ID for the checkbox
  };

   const CheckboxComponent :React.FC<CheckboxProps>=({
    label,
    checked,
    onChange,
    disabled = false,
    id,
  })=>{
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked);
      };
    return(
        <Form.Check
      type="checkbox"
      id={id}
      label={label}
      checked={checked}
      onChange={handleChange}
      disabled={disabled}
    />
    )
  }
  export default CheckboxComponent