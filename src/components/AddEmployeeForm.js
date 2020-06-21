import React from 'react';

function getLengthValidaion(valuesMap, values) {
  let errors = [];

  Object.keys(valuesMap).forEach((key) => {
    if (values[key].trim().length < valuesMap[key]) {
      errors.push(`${key} value should be longer than ${valuesMap[key]} characters`);
    }
  });

  return errors;
}

const createSubmitFunc = (handleSubmit) => (e) => {
  e.preventDefault();
  const { name, city, address, phone, email, creator } = e.target;

  const values = {
    name: name.value,
    city: city.value,
    address: address.value,
    phone: phone.value,
    email: email.value,
    creator: creator.value
  };

  const errors = getLengthValidaion({ creator: 2, name: 3, email: 3 }, values);

  if (errors.length) {
    alert(errors[0]);
    return;
  }

  handleSubmit(values);
};

export function AddEmployeeForm({ handleSubmit }) {
  return (
    <form onSubmit={createSubmitFunc(handleSubmit)} className="p-8 bg-gray-300 rounded">
      <InputComponent name="creator" required></InputComponent>

      <InputComponent name="name" required></InputComponent>

      <InputComponent name="city"></InputComponent>

      <InputComponent name="address"></InputComponent>

      <InputComponent name="phone"></InputComponent>

      <InputComponent name="email" required></InputComponent>

      <button className="bg-gray-700 px-5 py-1 text-white" type="submit">
        SUBMIT
      </button>
    </form>
  );
}

function InputComponent({ name, required }) {
  const requiredText = required ? <span className="text-red-700">*</span> : null;
  const labelName = name[0].toUpperCase() + name.slice(1);
  return (
    <label className="flex mb-5">
      <p className={`w-20 mr-3`}>
        {labelName} {requiredText}:
      </p>
      <input className="px-3 py-1 rounded" name={name} placeholder={` Employee ${labelName}`}></input>
    </label>
  );
}
