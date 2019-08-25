// Load the AWS SDK for Node.js
let AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-west-2'});
// Load credentials and set region from JSON file
// AWS.config.loadFromPath('~/.aws/credentials');
let credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;

// Create EC2 service object
let ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

// AMI is amzn-ami-2011.09.1.x86_64-ebs
let instanceParams = {
   ImageId: 'ami-0d837718892fd4869',
   InstanceType: 't2.micro',
   KeyName: 'bv-key',
   MinCount: 1,
   MaxCount: 1
};

function create(){
// Create a promise on an EC2 service object
let instancePromise = new AWS.EC2({apiVersion: '2016-11-15'}).runInstances(instanceParams).promise();

// Handle promise's fulfilled/rejected states
return instancePromise.then(
  function(data) {
    let instanceId = data.Instances[0].InstanceId;
    // Add tags to the instance
    tagParams = {Resources: [instanceId], Tags: [
       {
          Key: 'Name',
          Value: 'Beam-Me-Up'
       },
       {
         Key: 'Usage',
         Value: 'Beam-Me-Up'
       }
    ]};
    // Create a promise on an EC2 service object
    var tagPromise = new AWS.EC2({apiVersion: '2016-11-15'}).createTags(tagParams).promise();
    // Handle promise's fulfilled/rejected states
    return tagPromise.then(
      function(data) {
        return instanceId;
      }).catch(
        function(err) {
        console.error(err, err.stack);
      });
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });
};

module.exports = create;
