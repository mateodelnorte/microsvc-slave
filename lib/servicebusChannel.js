var debug = require('debug')('microsvc-master:servicebusChannel');

module.exports = function (master, bus, options) {
  options = options || {};
  options.slaveHeartbeat = options.slaveHeartbeat || 'slave.heartbeat';
  options.slaveOffline = options.slaveOffline || 'slave.offline';
  options.slaveOnline = options.slaveOnline || 'slave.online';

  bus.subscribe(options.slaveHeartbeat, function () {
    debug('slave heartbeat');
    master.channel.emit('slave.heartbeat', slave);
  });

  bus.subscribe(options.slaveOffline, function () {
    debug('slave offline');
    master.channel.emit('slave.offline', slave);
  });

  bus.subscribe(options.slaveOnline, function () {
    debug('slave online');
    master.channel.emit('slave.online', slave);
  });

};