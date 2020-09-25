import React from 'react';
import ReactSpinner from 'react-bootstrap-spinner';
import './LoadingIndicator.css'


class LoadingIndicator extends React.Component {
  render() {
    return (
      <div className="indicator">
        <ReactSpinner type="border" color="primary" size="5" />
      </div>
    )
  }
}

export default LoadingIndicator