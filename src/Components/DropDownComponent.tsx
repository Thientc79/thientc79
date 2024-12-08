import React, { useContext } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { StoreContext } from '../Services/StoreContext';

type DropdownProps = {
    title: string; // Title of the dropdown
    selectedValue: string; // Currently selected value
    onSelect: (value: string) => void; // Callback when an option is selected
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'| 'outline-primary' |
  'outline-danger'|'outline-secondary'|'outline-success'|'outline-warning'|'outline-info';
    disabled?: boolean; // Disable the dropdown
  };
  const DropDownComponent: React.FC<DropdownProps> = ({
    title,
    selectedValue,
    onSelect,
    variant = 'primary',
    disabled = false,
  }) => {
    const {dataStores,storeNo}=useContext(StoreContext)
    const handleSelect = (value: string | null) => {
      if (value) {
        onSelect(value);
      }
    };
  
    return (
      <DropdownButton
        title={title}
        variant={variant}
        onSelect={handleSelect}
        disabled={disabled}
      >
        {dataStores.map((option) => (
          <Dropdown.Item
            key={option.storE_NO}
            eventKey={option.storE_NO}
            active={option.storE_NO === selectedValue}
          >
            {option.storE_CODE}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    );
  };
  
  export default DropDownComponent;