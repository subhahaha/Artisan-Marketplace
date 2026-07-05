import { Component } from "react";

// Error boundaries have to be class components — React doesn't support
// a hooks-based way to catch render errors yet (as of React 18/19).
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Uncaught error in app:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-xl mx-auto px-6 py-24 text-center">
          <p className="font-display text-2xl text-plum mb-2">
            Something went wrong
          </p>
          <p className="text-ink-soft mb-6">
            An unexpected error occurred. Try going back to the shop.
          </p>
          <button
            onClick={this.handleReset}
            className="bg-plum text-paper px-6 py-3 rounded-sm text-sm font-medium hover:bg-plum-light transition-colors"
          >
            Back to shop
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}