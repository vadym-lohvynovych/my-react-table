import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './table.scss';

const subComponentButtonCol = {
  header: '',
  render: () => {
    return <p>{'>'}</p>;
  },
  className: 'show-sub-component flex-shrink-0 select-none px-3 py-1 block cursor-pointer flex items-center justify-center',
  showSubOnClick: true,
  style: { width: '45px' },
};

export function Table({ data, columns, renderSubComponent, accordionOpening, className, style }) {
  columns = renderSubComponent ? [subComponentButtonCol, ...columns] : columns;

  const [openedSubIds, setOpenedSubIds] = useState([]);

  function isSubOpened(id) {
    return openedSubIds.includes(id);
  }

  function showSubComponent(id) {
    const isOpened = isSubOpened(id);

    let newOpenedSubIds;

    if (accordionOpening) {
      newOpenedSubIds = isOpened ? [] : [id];
    } else {
      newOpenedSubIds = isOpened ? openedSubIds.filter((subId) => subId !== id) : [...openedSubIds, id];
    }

    setOpenedSubIds(newOpenedSubIds);
  }

  return (
    <div className={`overflow-x-auto border border-gray-300 ${className || ''}`} style={style}>
      <div className={`flex`}>{renderTableHeader(columns)}</div>
      {data.map((item) => (
        <React.Fragment key={item.id}>
          <div className={`flex ${isSubOpened(item.id) ? 'opened bg-gray-300' : ''}`}>{renderTableRow(columns, item, showSubComponent)}</div>
          {isSubOpened(item.id) && renderSubComponent(item)}
        </React.Fragment>
      ))}
    </div>
  );
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string,
      accessor: PropTypes.string, //key to get value from data item
      className: PropTypes.string,
      style: PropTypes.object,
      showSubOnClick: PropTypes.bool,
    })
  ),
  renderSubComponent: PropTypes.func,
  accordionOpening: PropTypes.bool,
  className: PropTypes.string,
};

function getColProps(col, isHead) {
  const width = col?.style?.width;
  const minWidth = col?.style?.minWidth;

  const commonClassName = `border-b border-gray-300 py-1 px-3 ${col.className || ''}`;
  const additionalClassName = isHead ? `th font-bold ${col.headerClassName}` : 'td';

  return {
    style: {
      ...col.style,
      width: width || '100%',
      minWidth: minWidth,
      flexShrink: width ? '0' : 'auto',
    },
    className: `${commonClassName} ${additionalClassName}`,
  };
}

function renderTableHeader(columns) {
  return columns.map((col, idx) => (
    <div key={idx} {...getColProps(col, true)}>
      {col.header}
    </div>
  ));
}

function renderTableRow(columns, item, showSubComponent) {
  return columns.map((col, idx) => (
    <div key={idx} {...getColProps(col)} onClick={col.showSubOnClick ? showSubComponent.bind(null, item.id) : null}>
      {col.render ? col.render(item) : item[col.accessor]}
    </div>
  ));
}
