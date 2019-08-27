'use strict'

const inquirer = require('inquirer');
const superagent = require('superagent');
const fs = require('fs');
require('dotenv');



/**
 * Prompt questions to ask users in the terimanal
 */
let questions = [
  {
    /** Asking for a URL of a github Repo 
     * type: is the type of response form the user. In this case it asking for user input, or to type/paste a URL at the command line.
     * name: is the name of the question 
     * @message: Is the massage in the terimal that the user sees.
     */
    type: 'input',
    name: 'GitHub Repo',
    message: 'Please paste a URL of the github Repo you like to use.',
    /**
     * @validate: Is a function that check if the user respones is ture (a github repo) or not.
     * Is a function to check if the respone is true or not
     * @param {user response} value 
     * the variable 'pass' will take the respone and match it to the URL 'https://github.com/'
     * If the value matches the the URL then it return true; else return a string saying it not a github repo. 
     */
    validate: function (value) {
      let pass = value.match('https://github.com/');

      if (pass) {
        return true;
      }
      return 'Please use a github repo'
    }
  },
  {
    /** 
     * Asking the user if they want to upload a .env file
     * type: Present the user a list of choies the the user can choose
     * name: The name of the promt
     * message: The message the user see in their terminal.
     * default: Shows a defult massage till a choice is chooesn
     * choices: List of opioions or choices the user can choose from.
    */
    type: 'list',
    name: 'dot-env-file',
    message: 'Do you have a env file that you want to upload(Y/N)',
    default: 'No dot-env-file has been selected',
    choices: ['Yes', 'No'],
    /**
     * validate: validate the user chooses
     * @param {user respons} value 
     * Check it the response is valid
     * if they choose "no" return a string
     * if they choose "yes" ask another prompt
     */  
    validate: function (value) {
      if (value !== "Yes" || "No") {
        return 'Please enter "Y" for yes or "N" of no'
      }
      if (value === "N") {
        return 'No dot-env-file has been selected'
      }
      if (value === "Y") {
        /** 
         * ask to put a file path to the .env file
         * type: is the type of response form the user. In this case it asking for user input, or to type/paste a URL at the command line.
         * name: is the name of the question 
         * message: Is the massage in the terimal that the user sees.
         */
        inquirer
          .prompt({
            type: 'input',
            name: 'envFilePath',
            message: 'Please enter dot-env-file path',
            /**
             * check the the input from the user
             * @param {user response} value 
             * match the value to '/.env' 
             * if it matches return true
             * if not return a string 
             */
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
/**
 * Remove the PORT from the .env file
 * @param {*} string 
 * Take a string and 
 * @return return the moified string
 */
let portRemover = function(string){
  let modifiedString = string.split('\n').filter(item => !item.includes('PORT')).join('\n');
  return modifiedString
}
/** 
 * Return the respones from the questions in a object
 * answers: the user reponds to each of the questions
 */
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