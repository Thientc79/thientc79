import { useContext, useEffect, useRef, useState } from "react";
import { Badge,  Dropdown, Form, InputGroup } from "react-bootstrap";
import { Store, StoreContext } from "../Services/StoreContext";

type MultiSelectProps = {
    //options: Store[]; // Array of selectable options
    selectedValues: string[]; // Currently selected values
    onChange: (values: string[]) => void; // Callback to handle selection changes
    label?: string; // Optional label for the select field
    placeholder?: string; // Placeholder text
    //isDisabled?: boolean;
  };
  const MultiSelectComponentold: React.FC<MultiSelectProps> = ({
    selectedValues,onChange,label,placeholder = 'Select options'}) => {
    const {dataStores,dataStoresAll}=useContext(StoreContext)
    const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const inputRef = useRef<HTMLDivElement>(null);

  // Filter options based on search term
  const filteredOptions = dataStores.filter((option) =>
    option.storE_CODE.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle dropdown outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleOptionClick = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(newSelectedValues);
  };

  const handleRemoveOption = (value: string) => {
    const updatedValues = selectedValues.filter((v) => v !== value);
    onChange(updatedValues);
  };
  return (
    <div ref={inputRef} style={{ position: 'relative' }}>
      <InputGroup>
      <div
          className="form-control d-flex flex-wrap align-items-center"
          onClick={handleToggleDropdown}
          style={{ cursor: 'pointer', minHeight: '38px' }}
        >
          {selectedValues.map((value) => {
            const option = dataStores.find((o) => o.storE_NO === value);
            return (
              <Badge
                key={value}
                className="me-1"
                bg="primary"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                {option?.storE_CODE}
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveOption(value);
                  }}
                  style={{
                    marginLeft: '8px',
                    cursor: 'pointer',
                    color: 'white',
                  }}
                >
                  ✖
                </span>
              </Badge>
            );
          })}
          {!selectedValues.length && <span className="text-muted">{placeholder}</span>}
        </div>

      </InputGroup>
      {isDropdownOpen && (
        <Dropdown.Menu show style={{ width: '100%', maxHeight: '200px', overflowY: 'auto', zIndex: 1050 }}>
          <div className="p-2">
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <Dropdown.Item
                key={option.storE_NO}
                onClick={() => handleOptionClick(option.storE_NO)}
                active={selectedValues.includes(option.storE_NO)}
              >
                <Form.Check
                  type="checkbox"
                  label={option.storE_CODE}
                  checked={selectedValues.includes(option.storE_NO)}
                  onChange={() => handleOptionClick(option.storE_NO)}
                />
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item className="text-muted">No options found</Dropdown.Item>
          )}
        </Dropdown.Menu>
      )}
    </div>
  );
};

export default MultiSelectComponentold;