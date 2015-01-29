var debug = require('debug')('microsvc-slave:localChannel');

module.exports = function (slave, options) {
  options = options || {};
  options.slaveHeartbeat = options.slaveHeartbeat || 'heartbeat';
  options.slaveOffline = options.slaveOffline || 'offline';
  options.slaveOnline = options.slaveOnline || 'online';

  function registerMaster (master) {
    debug('registering master');
    slave.channel.on(options.slaveHeartbeat, function (slave) {
      debug('slave heartbeat');
      master.emit('slave.heartbeat', slave);
    });
    slave.channel.on(options.slaveOffline, function (slave) {
      debug('slave offline');
      master.emit('slave.offline', slave);
    });
    slave.channel.on(options.slaveOnline, function (slave) {
      debug('slave online');
      master.emit('slave.online', slave);
    });
  }

  return {
    register: function register (master) {
      registerMaster(master);
    },
    remove: function remove (master) {
      master.removeAllListeners();
    }
  };
};