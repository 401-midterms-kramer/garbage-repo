'use strict';
// Load the AWS SDK for Node.js
let AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-west-2'});
// Load credentials and set region from JSON file
let credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;

// Create EC2 service object
let ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

function terminate(instanceId) {
  let params = {InstanceIds:[instanceId]};
    ec2.terminateInstances(params, function(err, data) {
      console.log('This is DATA,', data);
      console.log('Terminated,', data.TerminatingInstances[0].InstanceId);
      if (err) { console.log(err, err.stack) } // an error occurred
        else { console.log(data) };
    });
};

module.exports = terminate;
