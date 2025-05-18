import React from 'react';

const FormInput = ({ 
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  icon,
  error
}) => {
  return (
    <div className="form-input-wrapper">
      {icon && <span className="input-icon">{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`form-input ${error ? 'error' : ''}`}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default FormInput; 