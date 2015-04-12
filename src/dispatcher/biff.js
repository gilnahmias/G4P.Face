// Each instance of Biff has its own Dispatcher instance created and attached.
// In fact, all created Actions & Stores are also stored on the Biff object as actions and stores respectively.
var Biff = require('biff');
module.exports = new Biff();