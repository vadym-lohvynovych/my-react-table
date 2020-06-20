import React, { useState } from 'react';

import { Table } from './Table/Table';
import { TableSubComponent } from './TableSubComponent';
import { Modal } from './Modal';
import { AddEmployeeForm } from './AddEmployeeForm';

const avaliableRoles = [
  {
    label: 'driver',
    id: 1,
  },
  {
    label: 'agent',
    id: 2,
  },
  {
    label: 'operator',
    id: 3,
  },
  {
    label: 'usher',
    id: 4,
  },
  {
    label: 'system admin',
    id: 5,
  },
];

const defaultEmployees = [
  {
    id: 1,
    name: "Misha Lepet'ko",
    address: {
      city: 'Odessa',
      place: "Deribasivs'ka 23",
    },
    roles: [1, 3, 4],
    contactInfo: {
      phone: '+380666666666',
      mail: 'misha@gmail.com',
    },
    addedBy: 'Gloria Stelm',
    addDate: '16.12.1995',
  },
  {
    id: 2,
    name: 'Vadym Petrenko',
    address: {
      city: 'Kyiv',
      place: 'Svobody 55',
    },
    roles: [1, 2, 3],
    contactInfo: {
      phone: '+380555555555',
      mail: 'vadik@gmail.com',
    },
    addedBy: 'Sveta Svalt',
    addDate: '16.12.2000',
  },
  {
    id: 3,
    name: 'Oleg Petrenko',
    address: {
      city: 'Rivne',
      place: 'Svobody 44',
    },
    roles: [],
    contactInfo: {
      phone: '+38012333567',
      mail: 'oeg@gmail.com',
    },
    addedBy: 'Lena Buhgalter',
    addDate: '16.12.2005',
  },
  {
    id: 4,
    name: 'Petro Galaburda',
    address: {
      city: 'Kharkiv',
      place: 'Pushkina 44',
    },
    roles: [4, 5],
    contactInfo: {
      phone: '+380987654321',
      mail: 'petya@gmail.com',
    },
    addedBy: 'Lena Buhgalter',
    addDate: '16.12.2005',
  },
];

export function TableWrapper() {
  const [employees, setEmployees] = useState(defaultEmployees);

  const [employeeAddingRoleId, setEmployeeAddingRoleId] = useState(null);
  const [modalOpened, seModalOpened] = useState(false);

  const columns = [
    {
      header: 'Name',
      accessor: 'name',
      render: (cell) => <p className="font-bold text-blue-600">{cell.name}</p>,
      showSubOnClick: true,
      className: 'cursor-pointer',
    },
    {
      header: 'Address',
      render: renderAddress,
      className: `hidden md:block`,
    },
    {
      header: 'Roles',
      render: renderRoles,
      style: { minWidth: '250px' },
    },
  ];

  function addEmployee({ name, city, address, phone, email, creator }) {
    const newEmployee = {
      id: Date.now() + Math.random(),
      name: name,
      address: {
        city: city,
        place: address,
      },
      roles: [],
      contactInfo: {
        phone: phone,
        mail: email,
      },
      addedBy: creator,
      addDate: `16.12.${1960 + Math.round(Math.random() * 40)}`,
    };

    setEmployees((employees) => [...employees, newEmployee]);

    seModalOpened(false);
  }

  function renderAddress(cell) {
    return (
      <div className="cursor-pointer hover:bg-indigo-100 duration-100 px-2 rounded">
        <p>
          <b>{cell.address.city}</b>
        </p>
        <p>{cell.address.place}</p>
      </div>
    );
  }

  function renderRoles(cell) {
    if (employeeAddingRoleId === cell.id) {
      return (
        <select autoFocus value name="role" className="w-full" onChange={(e) => addRole(cell.id, e.target.value)} onBlur={setEmployeeAddingRoleId.bind(null, null)}>
          <option disabled value>
            -- select a role --
          </option>
          {avaliableRoles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.label}
            </option>
          ))}
        </select>
      );
    }

    const roles = cell.roles.map((roleId) => {
      const currentRole = avaliableRoles.find((role) => role.id == roleId);

      return (
        <div className="px-3 py-1 bg-gray-400 flex items-center mr-2 rounded my-1 text-xs" key={currentRole.id}>
          <p>{currentRole.label}</p>
          <button onClick={removeRole.bind(null, cell.id, currentRole.id)} className="bg-gray-300 px-1 ml-2 text-xs rounded duration-100 hover:bg-gray-500">
            X
          </button>
        </div>
      );
    });

    return (
      <div className="flex items-center flex-wrap">
        {roles}
        <button onClick={setEmployeeAddingRoleId.bind(null, cell.id)} className="rounded px-2 text-xs bg-indigo-200 hover:bg-indigo-300 duration-150 whitespace-no-wrap">
          ADD ROLE
        </button>
      </div>
    );
  }

  function removeRole(employeeId, roleId) {
    setEmployees((employees) => {
      return employees.map((emp) => {
        if (emp.id === employeeId) {
          emp.roles = emp.roles.filter((role) => role != roleId);
        }
        return emp;
      });
    });
  }

  function addRole(employeeId, roleId) {
    setEmployees((employees) => {
      return employees.map((emp) => {
        if (emp.id === employeeId) {
          if (emp.roles.includes(Number(roleId))) return emp;
          emp.roles = [...emp.roles, Number(roleId)];
        }
        return emp;
      });
    });
    setEmployeeAddingRoleId(null);
  }

  function renderSubComponent(row) {
    return <TableSubComponent renderAddress={renderAddress} data={row} />;
  }

  return (
    <div className="overflow-x-auto">
      <button className="bg-gray-300 px-5 py-1" onClick={seModalOpened.bind(null, true)}>
        Add new employee
      </button>
      <Table style={{ margin: '20px 0', minWidth: '450px' }} accordionOpening data={employees} columns={columns} renderSubComponent={renderSubComponent} />

      {modalOpened && (
        <Modal>
          <button
            onClick={seModalOpened.bind(null, false)}
            className="absolute bg-white px-5 py-1 rounded border-2 border-red-200 hover:border-red-400"
            style={{ top: '30px', right: '30px' }}
          >
            Close
          </button>
          <div className="h-full flex items-center justify-center">
            <AddEmployeeForm handleSubmit={addEmployee} />
          </div>
        </Modal>
      )}
    </div>
  );
}
