'use strict'

const prompt = require('prompt');


function envfile(envfile){
    prompt.get('do you want to up load a env file? Yes or No?')
    if('yes'||'y'){
        prompt.get('Please give file path')
    }
    if('no || n'){
        return next
    }
}

exports.Models =envFile;