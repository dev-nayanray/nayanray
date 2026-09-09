import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/* ------------------------------------------------------------------ */
/*  ErrorBoundary — catches runtime errors in any child component     */
/*  and shows a recovery UI instead of a white screen.                  */
/*                                                                    */
/*  Especially important for lazy-loaded routes — if a chunk fails    */
/*  to download (network error, deployment in progress), the user      */
/*  sees a friendly error with a retry button instead of a crash.     */
/* ------------------------------------------------------------------ */

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[ErrorBoundary]", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950 px-4">
          <div className="max-w-md text-center">
            <div className="inline-flex p-4 rounded-2xl bg-rose-500/10 mb-6">
              <svg className="w-8 h-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
              Something went wrong
            </h1>
            <p className="text-sm text-surface-900/50 dark:text-white/50 mb-6">
              {this.state.error?.message || "An unexpected error occurred. Try reloading the page."}
            </p>
            <button
              onClick={this.handleRetry}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-500 to-brand-700 text-white text-sm font-semibold rounded-xl shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-premium)] transition-all"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
