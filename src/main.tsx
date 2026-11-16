import { Component, type ErrorInfo, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Portfolio render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-6 text-center text-[#F5F5F7]">
          <h1 className="font-display text-4xl font-bold text-[#DC1E2E] uppercase">
            Shanmukha Vaibhav Tatipaka
          </h1>
          <p className="mt-3 text-sm text-zinc-400">
            Aspiring AI Engineer &amp; Software Developer · Joy University × NIAT
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 bg-[#DC1E2E] px-5 py-2.5 text-xs font-semibold tracking-widest text-white uppercase"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
