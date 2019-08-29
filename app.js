'use strict';
// Load the AWS SDK for Node.js
let AWS = require('aws-sdk');

let create = require('./aws-commands/ec2_createinstances.js');
let parse = require('./aws-commands/parseinstance.js');
let terminate = require('./aws-commands/terminateinstance.js');
// Set the region
AWS.config.update({region: 'us-west-2'});
// Load credentials and set region from JSON file
let credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;

create().then(instanceId => {
  parse(instanceId);
  // terminate(instanceId);
});
