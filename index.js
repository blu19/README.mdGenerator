const fs = require("fs")
const util = require("util")
const axios = require("axios")
const inquirer = require("inquirer")

inquirer.prompt({
    message: "Enter your GitHub username:",
    name: "github"
})
.then(function({ github }) {
    const queryUrl = `https://api.github.com/users/${github}`
    axios.get(queryUrl).then(function(res) {
        const userEmail = res.data.map(function(email) {
            return email.name
        })
        const userAvatar = res.data.map(function (avatar_url) {
            return avatar_url.name

    })
})

function promptUser() {
    return inquirer.prompt([
        {        
            message: "",       
            name: ""
        }
    ])
}

function generateReadMe(answers) {
    return `
    `
}

promptUser()
    .then(function(answers) {
        const readme = generateRedMe(answers);

        return writeFileAsync("README.md", readme);
    })
    .then(function() {
        console.log("Wrote to README.md");
    })
    .catch(function(err) {
        console.log(err);
    })