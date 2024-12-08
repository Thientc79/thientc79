import React, { useContext, useState } from 'react';
import CheckboxComponent from '../Components/CheckboxComponent'
import RadioGroupComponent from '../Components/RadioGroupComponent';
import DropDownComponent from '../Components/DropDownComponent';
import SelectComponent from '../Components/SelectComponent';
import MultiSelectComponent from '../Components/MultiSelectComponent';
import DatePickerComponent from '../Components/DatePickerComponent';
import { StoreContext } from '../Services/StoreContext';


export const Store=()=>{
  const {dataStores,dataStoresAll}=useContext(StoreContext)
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  
    
    return ( 
      <div className="container mt-4">
      <h1>MultiSelect Component with Search and Checkboxes</h1>
      <MultiSelectComponent
        label="Choose options"
        dataStores={dataStoresAll}
        selectedValues={selectedValues}
        onChange={setSelectedValues}
        placeholder="Search options..."
      />
    </div>
      );
}