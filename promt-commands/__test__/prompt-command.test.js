'use strict'
let fs = require('fs');
let prompt = require ('../prompt-inquirer/prompt-inquirer.js');
const superagent = require('supertest');

describe('Give a prompts',() =>{
    it('promts for a username',() =>{
        let name = 'Liz' ;
        let rawEnv = fs.readFileSync('./.env').toString();
        // console.log({rawEnv});
        expect(prompt.portRemover(rawEnv)).toBe('SECRET=THISISASEcreTPlZcHaNgEmE\n');
    })
})

describe('Supertest tests', () => {
    it('tries out the superagent call', () => {
        
    })
})