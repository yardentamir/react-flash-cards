import React from 'react';
import { Link } from 'react-router-dom';
export default class App extends React.Component {

  render = () => {
    return (
      <div>
        <div className="ui secondary pointing menu">
          <div style={{ display: 'flex' }}>
            <Link to="/" className="item">Flash Card Game</Link>
            <Link to="/edit" className="item">Cards Management</Link>
          </div>
        </div>
      </div>
    )
  }
}