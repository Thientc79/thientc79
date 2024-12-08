import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Form } from 'react-bootstrap';

type DatePickerProps = {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  dateFormat?: string; // Custom date format
};

const DatePickerComponent: React.FC<DatePickerProps> = ({
  selectedDate,
  onChange,
  placeholder = 'Select a date',
  label,
  disabled = false,
  dateFormat = 'dd/MM/yyyy',
}) => {
  return (
    <div>
      {label && <Form.Label>{label}</Form.Label>}
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        disabled={disabled}
        dateFormat={dateFormat}
        placeholderText={placeholder}
        className="form-control" // To match Bootstrap styling
      />
    </div>
  );
};

export default DatePickerComponent;