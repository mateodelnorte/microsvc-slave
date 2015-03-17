var debug = require('debug')('microsvc-slave:servicebusAdapter');

module.exports = function (slave, bus, options) {
  options = options || {};
  options.slaveHeartbeat = options.slaveHeartbeat;
  options.slaveOffline = options.slaveOffline;
  options.slaveOnline = options.slaveOnline;

  debug('registering master');

  if (options.slaveHeartbeat) {
    slave.channel.on('heartbeat', function (slave) {
      debug('slave heartbeat %j', slave);
      bus.publish(options.slaveHeartbeat, slave);
    });
  }

  if (options.slaveOffline) {
    slave.channel.on('offline', function (slave) {
      debug('slave offline %j', slave);
      bus.publish(options.slaveOffline, slave);
    });
  }

  if (options.slaveOnline) {
    slave.channel.on('online', function (slave) {
      debug('slave online %j', slave);
      bus.publish(options.slaveOnline, slave);
    });
  }

};