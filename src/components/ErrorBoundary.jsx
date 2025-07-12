import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
            <p className="text-gray-600 mb-8">We're sorry for the inconvenience. Please try refreshing the page.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition-colors"
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                  Debug Info (Development Only)
                </summary>
                <pre className="mt-4 p-4 bg-gray-100 rounded-md text-sm overflow-auto">
                  {this.state.error && this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;