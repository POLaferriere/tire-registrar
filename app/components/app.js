import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import {Alert} from 'react-bootstrap';

import TINForm from './tin-form';
import VINForm from './vin-form';
import InfoForm from './info-form';

import Car from '../models/car'

var App = React.createClass({
  getInitialState() {
    return {
      success: false,
      error: false,
    }
  },

  handleSubmit(e) {
    e.preventDefault();
    const form = $('.tire-form').serializeArray();

    let tires = _.filter(form, (obj) => {return /tin/.test(obj.name)});
    tires = tires.map((tire) => {return tire.value})

    const vin = _.find(form, (obj) => {return obj.name == 'vin'}).value

    const info = {
      name: _.find(form, (obj) => {return obj.name == 'name'}).value,
      streetAddress: _.find(form, (obj) => {return obj.name == 'street'}).value,
      city: _.find(form, (obj) => {return obj.name == 'city'}).value,
      state: _.find(form, (obj) => {return obj.name == 'state'}).value,
      zip: _.find(form, (obj) => {return obj.name == 'zip'}).value
    }
    const car = new Car({tires, vin, info})
    car.save(null, {
      success: (model, res) => {
        this.setState({
          success: true,
        })
      } 
    }, {
      error: (model, res) => {

      }
    });
  },

  render() {
    return (
      <div className="app-container">
        <h1>Tire Registrar</h1>
        
        {this.state.success &&
          <Alert bsStyle='success'>Tire's sucessfully saved</Alert>}

        {this.state.error &&}

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
