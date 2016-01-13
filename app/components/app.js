import React from 'react';

var App = React.createClass({
  

  render() {
    return (
      <div className="app-container">
        <div className="app-header">
          <h1>Tire Registrar</h1>
        </div>

        {this.props.children}
      </div>
    )
  }

});

export default App;
