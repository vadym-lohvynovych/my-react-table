import React from 'react';
import PropTypes from 'prop-types';

export function Select({ onChange, onBlur, options }) {
  return (
    <select autoFocus value className="w-full" onChange={onChange} onBlur={onBlur}>
      <option disabled value>
        -- select a role --
      </option>
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  )
};
