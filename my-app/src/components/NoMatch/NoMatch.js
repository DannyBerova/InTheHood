import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NoMatch extends Component {
  render() {
    return (
      <div className='container'>
        <div className="row section center">
        <h4> <i className="material-icons">gps_off</i> Page not found!</h4>
        <p>No match for this route! Check for valid path!</p>
        <Link to="/" className="waves-effect waves-light btn teal lighten-2">GO TO HOME</Link>
        </div>
      </div>
    );
  }
}

export default NoMatch;
