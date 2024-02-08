import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

//import the css
import './ColorPicker.css'; 

const ChangeColor = () => {
  const { changeSidebarColor, themeMode } = useContext(ThemeContext);

  const handleColorChange = (color) => {
    changeSidebarColor(color);
  };
  const colorOptions = ['#7f986f','#3a7d7d', '#014a3e'];
  

  return (
    <div className={`change-color-container ${themeMode}`}>
      <div className="color-options">
        {colorOptions.map((color, index) => (
          <button
            key={index}
            className="color-option"
            style={{ backgroundColor: color }}
            onClick={() => handleColorChange(color)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ChangeColor;
