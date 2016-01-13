import $ from 'jquery';

$.ajaxSetup({
  beforeSend(xhr, options) {
    if(options.url.match(/api.parse.com/)) {
      xhr.setRequestHeader('X-Parse-Application-Id', 'mSc1zgJ05kX6zQDJL0Aaq4i4gLCUbz8gFFFRw6EZ');
      xhr.setRequestHeader('X-Parse-REST-API-Key', '2DjkxnuGGviYIyo3r4vVTcfMwhcM9tMPNwO0pU45');
      if(localStorage.getItem('parse-session-token')) {
      	xhr.setRequestHeader('X-Parse-Session-Token', localStorage.getItem('parse-session-token'))
      }
    }
  }
});