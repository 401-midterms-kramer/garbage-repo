const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });

let params = {
  KeyName: "beam-me-up-key-pair"
};
ec2.createKeyPair(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else console.log(data);           // successful response
  /*
  data = {
  }
  */
});