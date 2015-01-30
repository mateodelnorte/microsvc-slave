var debug = require('debug')('microsvc-slave:localAdapter');

module.exports = function (slave, options) {
  options = options || {};
  options.slaveHeartbeat = options.slaveHeartbeat || 'slave.heartbeat';
  options.slaveOffline = options.slaveOffline || 'slave.offline';
  options.slaveOnline = options.slaveOnline || 'slave.online';

  function registerMaster (master) {
    debug('registering master');
    slave.channel.on('heartbeat', function (slave) {
      debug('slave heartbeat');
      master.emit(options.slaveHeartbeat, slave);
    });
    slave.channel.on('offline', function (slave) {
      debug('slave offline');
      master.emit(options.slaveOffline, slave);
    });
    slave.channel.on('online', function (slave) {
      debug('slave online');
      master.emit(options.slaveOnline, slave);
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