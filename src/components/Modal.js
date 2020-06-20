import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export function Modal({ children, closeModal }) {
  const el = document.createElement('div');
  el.classList.add('modal');

  useEffect(() => {
    document.body.appendChild(el);

    return () => {
      document.body.removeChild(el);
    };
  }, []);

  return ReactDOM.createPortal(children, el);
}
