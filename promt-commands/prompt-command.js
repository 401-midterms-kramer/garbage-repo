'use strict'

const prompt = require ('prompt');
const schema = require ('../promt-commands/prompt-command-schema.js');

prompt.start();

prompt.get(schema, function(err,result){
    console.log('command-line input received:');
    console.log('AWSusername: '+ result.AWSusername);
    console.log('github Repo: '+ result.githubRepo);
    console.log('env File: '+ result.envFile)
    if(result.envFile === 'yes'||'y'){
        console.log('env.filePath ' + result.envFilePath)
    };
});

