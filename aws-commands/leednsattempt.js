const AWS = require('aws-sdk');
const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

/* This example describes the specified instance. */

var params = {
    "image-id": [
       "i-1234567890abcdef0"
    ]
   };
   ec2.describeInstances(params, function(err, data) {
     if (err) console.log(err, err.stack); // an error occurred
     else     console.log(data);           // successful response
     /*
     data = {
     }
     */
   });