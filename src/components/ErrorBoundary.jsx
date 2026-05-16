import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
          <h1 className="text-4xl font-bold text-destructive mb-4">Something went wrong</h1>
          <pre className="bg-destructive/10 p-4 rounded-lg text-sm max-w-2xl whitespace-pre-wrap">
            {this.state.error?.message || 'Unknown error'}
          </pre>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90"
          >
            Reload App
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

