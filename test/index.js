var events = require('events');
var localChannel = require('../lib/localChannel');
var slave = require('../index');

require('should');

var masterMgr;

describe('microsvc-slave', function () {

  describe('on startup', function () {
    beforeEach(function () {
      slave.configure(function (slave) {
        masterMgr = localChannel(slave);
      });
    });
    afterEach(function () {
      slave.stop();
    });
    it('should initialize and notify master it is online', function (done) {
      var master = new events.EventEmitter();
      masterMgr.register(master);
      
      master.on('slave.online', function (slave) {
        done();
      });

      slave.initialize({
        id: 1
      });
    });
  });

  describe('at runtime', function () {
    it('should heartbeat until stopped', function (done) {
      var master = new events.EventEmitter();
      masterMgr.register(master);

      var count = 0;
      
      master.on('slave.heartbeat', function (slaveMemo) {
        count++;
        if (count == 2){
          slave.stop();
          setTimeout(function () {
            count.should.equal(2);
            done();
          }, 1000);
        }
      });

      slave.initialize({
        id: 1
      });
    });
  });

});