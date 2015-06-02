/**
 * Send Google Analytics data to Graphite
 * Copyright (c) 2015, Peter Hedenskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
'use strict';
var net = require('net');

function GraphiteSender(host, port) {
  this.host = host;
  this.port = port;
}

GraphiteSender.prototype.send = function(data, cb) {

  var self = this;

  var server = net.createConnection(this.port, this.host);
  server.addListener('error', function(connectionException) {
    console.log('error', 'Couldn\'t send data to Graphite:' + connectionException + ' for host:' + self.host +
      ' port:' +
      self.port);
      cb();
  });

  server.on('connect', function() {
    console.log('info', 'Sending data to Graphite host:' + self.host + ' port:' + self.port);
    this.write(data);
    this.end();
    cb();
  });

};


module.exports = GraphiteSender;
