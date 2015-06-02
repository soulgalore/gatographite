/**
 * Send Google Analytics data to Graphite
 * Copyright (c) 2015, Peter Hedenskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
'use strict';

var conf = require('../lib/cli'),
    gaToGraphite = require('../lib/gaToGraphite');

gaToGraphite.collect(conf);
