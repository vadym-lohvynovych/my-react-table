import React, { Component } from 'react';

export class ErrorBoundary extends Component {
  state = { error: false };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { error } = this.state;

    if (error) {
      return <h2 class="text-center px-3 my-16 text-blue-700 md:text-xl">Something went wrong... Please try again.</h2>;
    }
    return this.props.children;
  }
}
