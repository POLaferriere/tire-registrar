import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import {Alert, Modal, Button} from 'react-bootstrap';
import TransitionGroup from 'react-addons-css-transition-group'

import TINForm from './tin-form';
import VINForm from './vin-form';
import InfoForm from './info-form';

import Car from '../models/car'

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

    })
  },

  handleSubmit(e) {
    e.preventDefault();
    const form = $('.tire-form').serializeArray();

    this.state.car.tires = _.compact(this.state.car.tires.map((tire) => {return tire.join('')}));

    const car = new Car(this.state.car);

    car.on('invalid', (model, error) => {
      this.setState({
        error: true,
        errorMessage: error,
      })
    })

    car.save(null, {
      success: (model, res) => {
        this.setState({
          success: true,
          car: {
            tires: ['', '', '', ''],
            vin: '',
            info: {
              name: '',
              address: '',
              city: '',
              state: '',
              zip: '',
            },
            user: this.state.user,
          }
        })
      } 
    }, {
      error: (model, res) => {
        this.setState({
          error: true,
        })
      }
    });
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