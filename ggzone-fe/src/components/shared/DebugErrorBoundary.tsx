import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class DebugErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("DebugErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: '#ffebee', color: '#c62828', borderRadius: '8px', margin: '20px' }}>
          <h2 style={{ margin: '0 0 10px 0' }}>🚨 CÓ LỖI XẢY RA TRONG REACT COMPONENT 🚨</h2>
          <p><strong>Lỗi:</strong> {this.state.error?.message}</p>
          <pre style={{ background: '#fff', padding: '10px', overflowX: 'auto', fontSize: '12px', border: '1px solid #ef9a9a' }}>
            {this.state.error?.stack}
          </pre>
          <p style={{ marginTop: '10px', fontSize: '14px', fontWeight: 'bold' }}>
            Vui lòng copy TOÀN BỘ khung đỏ này và gửi lại cho Antigravity để fix!
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
