'use strict'

const inquirer = require('inquirer');
const superagent = require('superagent');
const fs = require('fs');
require('dotenv');


// Prompt question to ask the user in the terimanal
let questions = [
  {
    //asking for a Github repo
    type: 'input',
    name: 'GitHub Repo',
    message: 'Please paste a URL of the github Repo you like to use.',
    validate: function (value) {
      let pass = value.match('https://github.com/');

      if (pass) {
        return true;
      }
      return 'Please use a github repo'
    }
  },
  // Asking if they want to upload a .env file
  {
    type: 'list',
    name: 'dot-env-file',
    message: 'Do you have a env file that you want to upload(Y/N)',
    default: 'No dot-env-file has been selected',
    choices: ['Yes', 'No'],
    validate: function (value) {
      if (value !== "Yes" || "No") {
        return 'Please enter "Y" for yes or "N" of no'
      }
      if (value === "N") {
        return 'No dot-env-file has been selected'
      }
      if (value === "Y") {
        //if they do want
        inquirer
          .prompt({
            type: 'input',
            name: 'envFilePath',
            message: 'Please enter dot-env-file path',
            validate: function (value) {
              let pass = value.match('/.env')
              if (pass) {
                return true
              }
              return 'Please enter env file path'
            }
          })
      }
    }
  },
];

let portRemover = function(string){
  let modifiedString = string.split('\n').filter(item => !item.includes('PORT')).join('\n');
  return modifiedString
}

inquirer.prompt(questions).then(answers => {
  let repoObj = {}
  let repo = Object.values(answers)[0]
  let repoArray = Object.values(answers)[0].split('/');
  let envYN = answers['dot-env-file'];
  let env = '';
  if (envYN === 'Yes') {
    console.log('aw shit I need to figure out a .env file parser now');
    env = fs.readFileSync('../.env').toString();
    env = portRemover(env);
  }
  let organization = repoArray[3];
  let reponame = repoArray[4];
  let url = `https://raw.githubusercontent.com/${organization}/${reponame}/master/package.json`
  superagent.get(url).then(data => {
    let parsePackage = JSON.parse(data.text).main
    repoObj.repo = `${repo}.git`;
    repoObj.repoName = `${reponame}`;
    repoObj.entryPoint = `${parsePackage}`;
    repoObj.env = `${env}`;
    const URL = 'ec2-52-32-193-110.us-west-2.compute.amazonaws.com:3000/launch'
    console.log(repoObj);
    superagent.post(`${URL}`, repoObj)
    .auth('lee', 'lee')
    .then(res => console.log(`your new site is up on ${URL.split(':')[0]}:${res.body.inputObj.port}`))
    .catch(err => console.err(err))
  })
});