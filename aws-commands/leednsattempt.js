const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' })
const ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });

/* This example describes the specified instance. */

var params = {
  Filters: [
    {
      Name: "image-id",
      Values: [
        "ami-05b7c1459926442c5"
      ]
    },
    {
      Name:"instance-state-name",
      Values: [
        "running"
      ]
    }
  ]
};


module.exports = new Promise((res,rej) => {
  ec2.describeInstances(params, function (err, data) {
  if (err) rej(err, err.stack); 
  else res(data.Reservations[0].Instances[0].PublicDnsName)
})
})          


//   ec2.waitFor('instanceStatusOk', params, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else     console.log(data);           // successful response
//   });

