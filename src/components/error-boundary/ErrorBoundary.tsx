import { Component, ReactNode } from 'react';

type Props = {
  fallback: ReactNode;
  children: ReactNode;
};
type State = { hasError: boolean };

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { fallback, children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <>
          {fallback}
          <button type="button" onClick={() => this.setState({ hasError: false })}>
            Come back
          </button>
        </>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
