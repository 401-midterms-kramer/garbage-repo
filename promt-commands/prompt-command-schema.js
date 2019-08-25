'use strict'

//const envfile = require('../promt-commands/env.js') 
//var githubRepoQuestion ='Please paste a URL of the github Repo you like to use';
//let envfile = 'Do you have a env file that you want to upload (Y/N)';
//let envfilePath = 'Please put file path to env file';


let schema = {
  properties:{   
		AWSusername:{
			require:true
		},

		githubRepoQuestion:{
			description: 'Please paste a URL of the github Repo you like to use',
			type: 'string',
			pattern:'https://github.com/',
			message:'Needs to be a github repo',
			require:true,
		},
		

		envFile:{
			description:'Do you have a env file that you want to upload (Y/N)',
			type:'string',
			require: true,

		},
		envFilePath:{
			description:'Please put file path to env file',
			type:'string',
			require:true,
		},
			
	}
}


module.exports = schema;
