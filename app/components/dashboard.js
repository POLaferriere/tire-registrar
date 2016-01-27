import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import {Alert, Modal, Button} from 'react-bootstrap';
import TransitionGroup from 'react-addons-css-transition-group';
import store from '../store';

import TINForm from './tin-form';
import VINForm from './vin-form';
import InfoForm from './info-form';

import Car from '../models/car';
import VIN from '../models/vin';
import Tire from '../models/tire';

const Dashboard = React.createClass({
	getInitialState() {
    return {
      success: false,
      error: false,
      errorMessage: '',
      showModal: false,
      tin: '',
      logo: '',
      car: {
        tires: [[], [], [], []],
        vin: '',
        info: {
          name: '',
          address: '',
          city: '',
          state: '',
          zip: '',
        },
        user: ''
      }
    }
  },

  componentWillMount() {
    session.on('userLoaded', () => {
      this.state.car.user = {
        __type: 'Pointer',
        className: '_User',
        objectId: session.get('currentUser').get('objectId')
      }
      this.setState({
        car: this.state.car,
        logo: session.get('currentUser').get('logo').url
      })
      this.forceUpdate();

    });
    let VINs = store.getVINCollection();
    VINs.fetch();
  },

  handleSubmit(e) {
    e.preventDefault();


    //TODO: Refactor out of car object
    let vins = store.getVINCollection();
    let viNumbers = vins.pluck('VIN');
    
    if (_.contains(viNumbers, this.state.car.vin)) {
      let foundVIN = vins.find((vin) => {return vin.get('VIN') == this.state.car.vin})
      this.state.car.tires.forEach((tire) => {
        if (tire.length > 0) {
          let newTire = new Tire({
            TIN: tire.join(''),
            manCode: tire[0].substring(0, 2),
            dateCode: Number(tire[2]),
            vin: {
              __type: 'Pointer',
              className: 'VIN',
              objectId: foundVIN.get('objectId'),
            },
            dealer: this.state.car.user
          })
          newTire.save();
        }
      })
    } else {
      let vin = new VIN({
        VIN: this.state.car.vin,
        info: this.state.car.info
      });

      store.addVIN(vin).then((res) => {
        this.state.car.tires.forEach((tire) => {
          if (tire.length > 0) {
            let newTire = new Tire({
              TIN: tire.join(''),
              manCode: tire[0].substring(0, 2),
              dateCode: Number(tire[2]),
              vin: {
                __type: 'Pointer',
                className: 'VIN',
                objectId: res.objectId,
              },
              dealer: this.state.car.user
            })
            newTire.save();
          }
        })
      });
    }
  
  },

  closeMessage() {
    this.setState({
      success: false,
      error: false,
    })

  },

  showModal(tin) {
    this.setState({
      tin: tin,
      showModal: true
    })
  },

  close() {
    this.setState({showModal: false})
  },

  onChange(state, change) {
    this.state.car[state] = change;
    this.setState({
      car: this.state.car
    })
  },

	render() {
    let logoStyle = {
      background: 'url(' + this.state.logo + ') center no-repeat',
      backgroundSize: 'contain'
    }

    let car = this.state.car

		return (
			<div className="dashboard-page">

	      <div className="dashboard-container">

         <TransitionGroup 
          transitionName='success' 
          transitionEnterTimeout={500} 
          transitionLeaveTimeout={500}
          >
            {this.state.success &&
              <Alert bsStyle='success' onDismiss={this.closeMessage} key={'success'}>
                {"Tire has sucessfully been saved"}
              </Alert>}
          </TransitionGroup>

        
          <TransitionGroup 
            transitionName='error' 
            transitionAppear={true} 
            transitionAppearTimeout={500}  
            transitionEnterTimeout={500} 
            transitionLeaveTimeout={500}
          >
            {this.state.error &&
              <Alert bsStyle='danger' key={this.state.errorMessage} onDismiss={this.closeMessage}>
                {this.state.errorMessage}
              </Alert>}
          </TransitionGroup>

          <div className='dashboard-logo' key={this.state.logo} style={logoStyle} />

	        <form className='tire-form'>
	          <TINForm showInfo={this.showModal} tires={car.tires} onChange={this.onChange}/>
	          <VINForm vin={car.vin} onChange={this.onChange}/>
	          <InfoForm info={car.info} onChange={this.onChange}/>
	          <Button bsClass='dashboard-submit-button' onClick={this.handleSubmit}>Save Tires</Button>
	        </form>
	      </div>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <h1>Tire Information</h1>
          </Modal.Header>
          <Modal.Body>
            <p>{'TIN: ' + this.state.tin}</p>
            <p>This will eventually contain specific tire information</p>
          </Modal.Body>
        </Modal>
      </div>
    );
	}
})

export default Dashboard;