import React, {Fragment} from 'react';
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }
    
    componentDidCatch(error, errorInfo) {
      // Catch errors in any components below and re-render with error message
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
      // You can also log error messages to an error reporting service here
    }
    
    render() {
      if (this.state.errorInfo) {
        // Error path
        return (
          <Fragment>
            <img src="https://cdn-images-1.medium.com/max/2000/1*xzoYpYHX1Cgb9cuUi6w-LQ.png" alt="https://cdn-images-1.medium.com/max/2000/1*xzoYpYHX1Cgb9cuUi6w-LQ.png" className="shrinkToFit transparent" width="935" height="448"/>

            {/* comment section details below before put in production */}
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <h4>This error will be handled in production!</h4>
            </details>
            
          </Fragment>
        );
      }
      // Normally, just render children
      return this.props.children;
    }  
  }


   export default ErrorBoundary;