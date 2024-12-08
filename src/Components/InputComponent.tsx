import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';


interface InputWithIconProps {
  value: string;
  onChange:(value: string) => void;
  placeholder?: string;
  type?: string;
  icon: React.ReactNode; // Icon component to display
  iconPosition?: 'left' | 'right'; // Position of the icon
}

const InputComponent: React.FC<InputWithIconProps> = ({
  value,
  onChange,
  placeholder,
  type = 'text', // Default type is text
  icon,
  iconPosition = 'left', // Default icon position is left
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
   
    <InputGroup>
      {iconPosition === 'left' && <InputGroup.Text>{icon}</InputGroup.Text>}
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {iconPosition === 'right' && <InputGroup.Text>{icon}</InputGroup.Text>}
    </InputGroup>
  );
};

export default InputComponent;