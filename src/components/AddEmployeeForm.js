import React from 'react';

function getLengthValidaion(valuesMap, values) {
  let errors = [];
  Object.keys(valuesMap).forEach((key) => {
    if (values[key].length < valuesMap[key]) {
      errors.push(`${key} value should be longer than ${valuesMap[key]} characters`);
    }
  });
  return errors;
}

export function AddEmployeeForm({ handleSubmit }) {
  function onSubmit(e) {
    e.preventDefault();
    const { name, city, address, phone, email, creator } = e.target;

    const values = {
      name: name.value,
      city: city.value,
      address: address.value,
      phone: phone.value,
      email: email.value,
      creator: creator.value,
    };

    const errors = getLengthValidaion({ creator: 3, name: 3, email: 3 }, values);

    if (errors.length) {
      alert(errors[0]);
      return;
    }

    handleSubmit(values);
  }

  return (
    <form onSubmit={onSubmit} className="p-8 bg-gray-300 rounded">
      <RenderInput name="Creator" isRequired></RenderInput>

      <RenderInput name="Name" isRequired></RenderInput>

      <RenderInput name="City"></RenderInput>

      <RenderInput name="Address"></RenderInput>

      <RenderInput name="Phone"></RenderInput>

      <RenderInput name="Email" isRequired></RenderInput>

      <button className="bg-gray-700 px-5 py-1 text-white" type="submit">
        SUBMIT
      </button>
    </form>
  );
}

function RenderInput({ name, isRequired }) {
  const required = isRequired ? <span className="text-red-700">*</span> : null;
  return (
    <label className="flex mb-5">
      <p className={`w-20 mr-3`}>
        {name} {required}:
      </p>
      <input className="px-3 py-1 rounded" name={name.toLowerCase()} placeholder={`${name}`}></input>
    </label>
  );
}
