import Session from '../models/session';

window.session = new Session();
session.restore();