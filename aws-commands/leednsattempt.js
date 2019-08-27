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
    }
  ]
};
let output = ''
return ec2.describeInstances(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else data.Reservations.forEach(res => res.Instances.forEach(inst => {
    if (inst.PublicDnsName) {
      return inst.PublicDnsName
    }
    else {}
  }));           // successful response
  /*
  data = {
  }
  */
});
//   ec2.waitFor('instanceStatusOk', params, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else     console.log(data);           // successful response
//   });