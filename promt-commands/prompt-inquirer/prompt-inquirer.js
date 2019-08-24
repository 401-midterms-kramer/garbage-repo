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

//for the dot env file path	
let filepath = [
  {
    type: 'input',
    name: 'envFilePath',
    message: 'Please place file path',
    validate: function (value) {
      let pass = value.match('.env')
      if (pass) {
        return true;
      }
      return 'need file path'
    }
  }
];


inquirer.prompt(questions).then(answers => {
  //console.log(answers);
  let repo = Object.values(answers)[0]
  let repoArray = Object.values(answers)[0].split('/');
  //console.log(repoArray)
  //{ 'GitHub Repo': 'https://github.com/401-midterms-kramer/beam-me-up_server' }
  let organization = repoArray[3];
  let reponame = repoArray[4];
  let url = `https://raw.githubusercontent.com/${organization}/${reponame}/master/package.json`
  //console.log(url)
  superagent.get(url).then(data => {
    let parsePackage = JSON.parse(data.text).main
    console.log(
      {
        repo: `${repo}.git`,
        repoName: `${reponame}`,
        entryPoint: `${parsePackage}`,
        env: `TBD=mlem`
      })
  })
});