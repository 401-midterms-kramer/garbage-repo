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

let arr = { values: ['1'] };

function parse(instanceId) {
  let params = {InstanceIds:[instanceId]};
  arr.values.forEach(function (element) {
      ec2.describeInstances(params, function (err, data) {
          console.log('DNS', data.Reservations[0].Instances[0].PublicDnsName);
      });
  });
};

module.exports = parse;
