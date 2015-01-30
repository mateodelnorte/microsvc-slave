var debug = require('debug')('microsvc-slave:servicebusAdapter');

module.exports = function (slave, bus, options) {
  options = options || {};
  options.slaveHeartbeat = options.slaveHeartbeat || 'slave.heartbeat';
  options.slaveOffline = options.slaveOffline || 'slave.offline';
  options.slaveOnline = options.slaveOnline || 'slave.online';

  debug('registering master');
  slave.channel.on('heartbeat', function (slave) {
    debug('slave heartbeat %j', slave);
    bus.publish(options.slaveHeartbeat, slave);
  });
  slave.channel.on('offline', function (slave) {
    debug('slave offline %j', slave);
    bus.publish(options.slaveOffline, slave);
  });
  slave.channel.on('online', function (slave) {
    debug('slave online %j', slave);
    bus.publish(options.slaveOnline, slave);
  });

};