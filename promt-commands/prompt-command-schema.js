'use strict'

//const envfile = require('../promt-commands/env.js') 
var githubRepo ='Please paste a URL of the github Repo you like to use';
let envfile = 'Do you have a env file that you want to upload (Y/N)';
let envfilePath = 'Please put file path to env file';


let schema = {
  properties:{   
		AWSusername:{
			require:true
		},

		'Please paste a URL of the github Repo you like to use':{
       	 require: true
    	},
		'Do you have a env file that you want to upload (Y/N)':{
				require: true
		},
		'Please put file path to env file':{
			require:true
		}
	}
}

module.exports = schema;
