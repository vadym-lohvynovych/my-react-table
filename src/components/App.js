import React from 'react';
import { TableWrapper } from './TableWrapper';
import { ErrorBoundary } from './ErrorBoundary';

export function App() {
  return (
    <ErrorBoundary>
      <div className="container mx-auto">
        <h1 className="text-center text-2xl my-5 font-hairline">Gorgeous Table</h1>
        <TableWrapper />
      </div>
    </ErrorBoundary>
  );
}
