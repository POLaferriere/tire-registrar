import React from 'react';
import TIN-Form from './tin-form';
import VIN-Form from './vin-form';
import Info-Form from './info-form';

var App = React.createClass({

  render() {
    return (
      <h1>Tire Registrar</h1>
      <TIN-Form/>
      <VIN-Form/>
      <Info-Form/>
    );
  }

});

export default App;
