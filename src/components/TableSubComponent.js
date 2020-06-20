import React from 'react';

export function TableSubComponent({ data, renderAddress }) {
  const {
    contactInfo: { phone, mail },
  } = data;

  return (
    <div className="py-2 px-4 rounded-b mb-2">
      <Details header="Contact info">
        <p className="detail whitespace-no-wrap">
          Phone:{' '}
          <a className="link" href={`tel:${phone}`}>
            {phone}
          </a>
        </p>
        <p className="detail whitespace-no-wrap">
          Email:{' '}
          <a className="link" href={`mailto:${mail}`}>
            {mail}
          </a>
        </p>
      </Details>

      <Details className="md:hidden" header="Addres">
        {renderAddress(data)}
      </Details>

      <Details header="More info">
        <a className="link" href="#">
          WATCH
        </a>
      </Details>

      <Details header="Id">
        <p className="text-red-600">{data.id}</p>
      </Details>

      <Details header="Added by">
        <p>{data.addedBy}</p>
      </Details>
    </div>
  );
}

function Details({ header, children, className }) {
  return (
    <div className={`flex items-center border-b border-dashed border-gray-300 py-2 ${className}`}>
      <div>
        <p>
          <b>{header}:</b>
        </p>
      </div>
      <div className="px-4">{children}</div>
    </div>
  );
}
