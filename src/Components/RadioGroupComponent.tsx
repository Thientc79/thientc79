import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { AuthContext } from '../Services/AuthContext';

type RadioOption = {
  label: string; // Label for the radio button
  value: string; // Value for the radio button
  disable?:boolean;
 
};
type RadioGroupProps = {
    
    selectedValue: string; // Currently selected value
    onChange: (value: string) => void; // Callback for when selection changes
    inline?: boolean; // If true, render radio buttons inline
  };
  const optionOne = [
    { label: 'Cửa Hàng', value: '1',disable:true },
    { label: 'Khu Vực', value: '2',disable:true },
    { label: 'Toàn quốc', value: '3',disable:false },
  ];
  const optionAll = [
    { label: 'Cửa Hàng', value: '1',disable:false },
    { label: 'Khu Vực', value: '2',disable:false },
    { label: 'Toàn quốc', value: '3',disable:false },
  ];
  const RadioGroupComponent: React.FC<RadioGroupProps> = ({
   
    selectedValue,
    onChange,
    inline = false,
  }) => {
    const {users}=useContext(AuthContext)
    const [options,setOptions]=useState<RadioOption[]>([])
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    };
    useEffect(()=>{
        const load=()=>{
            if(users[0].role==='CH'){setOptions(optionAll)}else(setOptions(optionOne))
          };
        load();
    },[])
    return (
      <Form>
        {options.map((option, index) => (
          <Form.Check
            type="radio"
            key={option.value}
            label={option.label}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleChange}
            inline={inline}
            disabled={option.disable}
          />
        ))}
      </Form>
    );
  };
  
  export default RadioGroupComponent;
  