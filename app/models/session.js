import $ from 'jquery'
import Backbone from 'backbone';

import User from './user';

const Session = Backbone.Model.extend({
  authenticate(options) {
    if (options.username && options.password) {
      return $.ajax({
        url: "https://api.parse.com/1/login",
        data: {
          username: options.username,
          password: options.password
        },
      }).then((response) => {
        const user = new User(response);
        this.set('currentUser', user);
        this.trigger('login');
        localStorage.setItem('parse-session-token', response.sessionToken);
        return true;
      });
    } else if (options.sessionToken) {
      // I'm authenticating with a sessionToken
      localStorage.setItem('parse-session-token', options.sessionToken);
      var user = new User(options.sessionToken);
      this.set('currentUser', user);
      this.trigger('login');
      return user.fetch().then(() => {
        this.set('currentUser', user.clone());
        return true;
      });
    } else {
      var dfd = new $.Deferred();
      dfd.reject("Invalid arguments to authenticate");
      return dfd.promise();
    }
  },

  restore() {
    var token = localStorage.getItem('parse-session-token');
    if (token) {
      this.authenticate({
        sessionToken: token
      });
    }
  },

  invalidate() {
    localStorage.removeItem('parse-session-token');
    this.unset('currentUser');
    this.trigger('logout');
  },

  isAuthenticated() {
    return !!this.get('currentUser');
  }
})

export default Session;