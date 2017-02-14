/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * http://sailsjs.org/#!/documentation/concepts/Logging
 */

var winston = require('winston');

var timestamp = function () {
    var d = new Date();
    return d.toLocaleDateString() + " " + d.toLocaleTimeString() + "." + d.getMilliseconds();
};

var formatter = function (options) {
    return ( "[" + options.timestamp() + "] - <" + options.level + "> : " +
    ( options.message ? options.message : '' ) +
    ( options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '' ) );
};

var customLogger = new winston.Logger({
    transports: [
        new (winston.transports.Console)({
            timestamp: timestamp,
            formatter: formatter,
            level: 'silly'
        }),

        new (winston.transports.DailyRotateFile)({
            filename: "log",
            dirname: "./logs",
            level: 'silly',
            json: false,
            timestamp: timestamp,
            formatter: formatter
        })
    ]
});

module.exports.log = {

  /***************************************************************************
  *                                                                          *
  * Valid `level` configs: i.e. the minimum log level to capture with        *
  * sails.log.*()                                                            *
  *                                                                          *
  * The order of precedence for log levels from lowest to highest is:        *
  * silly, verbose, info, debug, warn, error                                 *
  *                                                                          *
  * You may also set the level to "silent" to suppress all logs.             *
  *                                                                          *
  ***************************************************************************/

  level: 'info',
  colors: false,  // To get clean logs without prefixes or color codings
  custom: customLogger
};
