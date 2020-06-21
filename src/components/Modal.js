import { useEffect } from 'react';
import ReactDOM from 'react-dom';

export function Modal({ children }) {
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
