var events = require('events');
var debug = require('debug')('microsvc-slave');
var util = require('util');

function Slave () {
  this.id = undefined;
  this.channel = new events.EventEmitter();
  this.heartbeatFrequency = 1000;
  this.slaves = {};
  events.EventEmitter.apply(this);
}

util.inherits(Slave, events.EventEmitter);

Slave.prototype.configure = function configure (fn) {
  fn(this);
};

Slave.prototype.initialize = function initialize (options) {
  options = options || {};
  
  if ( ! options.id) {
    throw new Error('slave must be initialized with an id');
  }
  
  this.id = options.id;

  if (options.heartbeatFrequency) {
    this.heartbeatFrequency = options.heartbeatFrequency;
  }

  this._startHeartbeat();

  this.emit('online', this);
  
  this.channel.emit('online', this._createSlavePayload(this));
};

Slave.prototype.pauseHeartbeat = function pauseHeartbeat () {
  clearInterval(this.heartbeatInterval);
};

Slave.prototype.resumeHeartbeat = function resumeHeartbeat () {
  this._startHeartbeat();
};

Slave.prototype.stop = function stop () {
  this.channel.removeAllListeners();
  clearInterval(this.heartbeatInterval);
  this.slaves = {};
  this.emit('offline', this);
  this.channel.emit('offline', this._createSlavePayload(this));
};

Slave.prototype._createSlavePayload = function _createSlavePayload (slave) {
  return {
    id: this.id
  };
};

Slave.prototype._heartbeat = function _heartbeat () {
  debug('heartbeat');
  this.emit('heartbeat', this);
  this.channel.emit('heartbeat', this._createSlavePayload(this));
};

Slave.prototype._startHeartbeat = function _startHeartbeat () {
  this.heartbeatInterval = setInterval(this._heartbeat.bind(this), this.heartbeatFrequency);
};

module.exports = new Slave();
