import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { StoreContext } from '../Services/StoreContext';
type SelectProps = {
   
    selectedValue: string; // Currently selected value
    onChange: (value: string) => void; // Callback for handling changes
    label?: string; // Label for the select field
    placeholder?: string; // Placeholder text
  
  };
const SelectComponent: React.FC<SelectProps> =(
   
   {selectedValue,
    onChange,
    label,
    placeholder = 'Please select...',
   } 
)=>{
    const {dataStores,storeNo}=useContext(StoreContext)
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
      };
return(
    <Form.Group>
    {label && <Form.Label>{label}</Form.Label>}
    <Form.Select value={selectedValue} onChange={handleChange} >
      {placeholder && <option value="">{placeholder}</option>}
      {dataStores.map((option) => (
        <option key={option.storE_NO} value={option.storE_NO} >
          {option.storE_CODE}
        </option>
      ))}
    </Form.Select>
  </Form.Group>
)
}
export default SelectComponent
  