'use strict';
//
// CloudMine, Inc.
// 2015
//

/**
 * Require your Snippets
 * This can be more expressive, for example, you can use `fs` to
 * read all snippets in a directory and set them to your `module.exports`.
 */

var ValidicRouter = require('./lib/validic_router_snippet');
var ValidicStats = require('./lib/validic_statistics_snippet');
var ValidicUsers = require('./lib/validic_user_snippet');
var CloudMineNode = require('cloudmine-servercode');
// Require any other node module you want...

/**
 * The `module.exports` **must** be called before the server is started,
 * or the server won't be able to read in the exports.
 */
module.exports = {
  store: ValidicRouter,
  stats: ValidicStats,
  users: ValidicUsers,
};

/**
 * Start the CloudMine server.
 */
CloudMineNode.start(module, './index.js', function(err) {
  console.log('Server Started?', err);
});
