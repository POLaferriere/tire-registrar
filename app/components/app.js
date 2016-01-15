import React from 'react';
import {Link} from 'react-router';
import TransitionGroup from 'react-addons-css-transition-group';

var App = React.createClass({

  componentWillMount() {
    if(session.isAuthenticated()) {
      this.setState({loggedIn: true})
    } else {
      this.setState({loggedIn: false})
    }

    session.on('login', () => {
      this.setState({loggedIn: true})
    });

    session.on('logout', () => {
      this.setState({loggedIn: false})
    })
  },
  

  render() {
    return (
      <div className="app-container">
        <div className="app-header-container">
          <div className="app-header">
            <div className="app-header-left">
              <h1><Link to='/'>Tire Registrar</Link></h1>
            </div>

            <TransitionGroup 
              component='div' 
              className='app-header-right' 
              transitionName='link' 
              transitionEnterTimeout={300} 
              transitionLeaveTimeout={300}
            >
              {this.state.loggedIn &&
                <ul className="app-header-links">
                  <li className='app-header-link'><Link to='/settings'>Settings</Link></li>
                  <li className='app-header-link'><Link to='/logout'>Logout</Link></li>
                </ul>}
            </TransitionGroup>

          </div>
        </div>

        {this.props.children}
      </div>
    )
  }

});

export default App;
