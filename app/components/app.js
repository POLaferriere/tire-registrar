import React from 'react';
import $ from 'jquery';

import TINForm from './tin-form';
import VINForm from './vin-form';
import InfoForm from './info-form';

var App = React.createClass({

  handleSubmit(e) {
    e.preventDefault();
    console.log($('.tire-form').serializeArray());
  },

  render() {
    return (
      <div className="app-container">
        <h1>Tire Registrar</h1>
        <form className='tire-form'>
          <TINForm/>
          <VINForm/>
          <InfoForm/>
          <input type="submit" onClick={this.handleSubmit}/>
        </form>
      </div>
    );
  }

});

export default App;
