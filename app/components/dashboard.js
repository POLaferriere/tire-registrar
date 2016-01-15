import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import {Alert, Modal} from 'react-bootstrap';
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
    }
  },

  componentWillMount() {
    this.setState({
      logo: session.get('currentUser').get('logo')
    })
    console.log(this.state.logo)
  },

  componentDidMount() {
    this.setState({
      logo: session.get('currentUser').get('logo')
    })
    console.log(this.state.logo)

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
      zip: _.find(form, (obj) => {return obj.name == 'zip'}).value,
    }

    const user = session.get('currentUser').get('objectId')


    const car = new Car({tires, vin, info,
      user: {
        __type: 'Pointer',
        className: '_User',
        objectId: user
      }  
    });

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

	render() {
    const logo = (!!this.state.logo && this.state.logo.url) || '';
    const logoStyle = {
      background: 'url(' + logo + ')',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    }

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

          <div className='dashboard-logo' style={logoStyle} />

	        <form className='tire-form'>
	          <TINForm showInfo={this.showModal}/>
	          <VINForm/>
	          <InfoForm/>
	          <input className='dashboard-submit-button' type="submit" onClick={this.handleSubmit}/>
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