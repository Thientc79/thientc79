import React from 'react';
import { Button } from 'react-bootstrap';



type ButtonProps = {
  icon: React.ReactNode; // The icon component to display
  children: React.ReactNode,
  onClick: () => void; // Function when button is clicked
  color?: string; // Color of the text (e.g., "primary", "secondary")
  backgroundColor?: string; // Background color of the button
  size?: 'sm' | 'lg' ; // Size of the button (small, large)
  disabled?: boolean; // If the button is disabled
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'| 'outline-primary' |
  'outline-danger'|'outline-secondary'|'outline-success'|'outline-warning'|'outline-info'; // Bootstrap button variant
  
};



const ButtonComponent: React.FC<ButtonProps> = ({
  icon,
  onClick,
  color = 'white', // Default text color is white
  backgroundColor = 'blue', // Default background color
  size = 'sm', // Default size is small
  disabled = false, // Default is not disabled
  variant = 'primary', // Default variant is primary
  children, // Button text or content

}) => {
  return (
    <Button
    variant={variant} // Sets the variant (color theme) of the button
    style={{ backgroundColor, color }} // Inline styling for background and text color
    size={size} // Sets the size of the button
    onClick={onClick} // Event handler for click
    disabled={disabled} // If true, button is disabled
  > {children}
    <span style={{marginLeft:10}}>{icon} </span>
  </Button>
  );
};

export default ButtonComponent;