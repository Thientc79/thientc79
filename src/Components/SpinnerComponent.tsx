import React from 'react';
import { Spinner } from 'react-bootstrap';


type SpinnerProps = {
  animation?: 'border' | 'grow';  // Spinner animation type
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'; // Color variant
  size?: 'sm' ;  
};

const SpinnerComponent: React.FC<SpinnerProps> = ({
  animation = 'border', 
  variant = 'primary',  
  size = 'sm'         
} ) => {
  return (
    <Spinner 
    animation={animation} 
    variant={variant} 
    size={size} 
    role="status"
  >
    <span className="visually-hidden">Loading...</span>
  </Spinner>
  )
};

export default SpinnerComponent;