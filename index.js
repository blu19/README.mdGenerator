const fs = require("fs")
const util = require("util")
const axios = require("axios")
const inquirer = require("inquirer")
var userEmail = "";
var userAvatar = "";

// (add default)
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is your GitHub username?",
            name: "github"
        },
        {
            type: "input",
            message: "What is your project's name?",
            name: "projectName"
        },
        {
            type: "input",
            message: "Please write a short description of your project:",
            name: "description"
        },
        {
            type: "list",
            message: "What kind of license should your project have?",
            name: "license",
            choices: ["MIT", "APACHE", "GPL", "BSD", "None"] 
        },
        {
            type: "input",
            message: "What command should be run to install dependencies?",
            name: "installation"
        },
        {
            type: "input",
            message: "What command should be run to run tests?",
            name: "test"
        },
        {
            type: "input",
            message: "What does the user need to know about using the repo?",
            name: "usage"
        },
        {
            type: "input",
            message: "What does the user need to know about contributing to the repo?",
            name: "contributing"
        }
    ]);
}

const writeFileSync = util.promisify(fs.writeFile);

// to generate the readme file
function generateReadMe(answers) {
    return `
    #${answers.projectName}
    [![GitHub License]         (https://github.com/${answers.github}/${answers.projectName})

    ## Description
    ${answers.description}

    ## Table of Contents

    * [Installation](#installation)

    * [Usage](#usage)

    * [License](#license)

    * [Contributing](#contributing)

    * [Tests](#tests)

    * [Questions](#questions)

    ## Installation

    To install necessary dependencies, run the following command: 

    ...

    ${answers.installation}

    ...

    ## Usage

    ${answers.usage}

    ## License

    This project is licensed under the ${answers.license} license.

    ## Contributing

    ${answers.contributing}

    ## Tests

    To run tests, run the following command:
    
    ...
    
    ${answers.test}

    ...

    ## Questions

    <img src="${answers.data.userAvatar}"
    alt="avatar" style="border-radius: 16px" width="30" />

    If you have any questions about the repo, open an issue or contact 
    [${answers.github}](https://api.github.com/users/${answers.github}) 
    directly at [${userEmail}]
    `
}

promptUser()
// /project
    .then(function (answers) {
        const queryUrl = `https://api.github.com/users/${answers.github}`
        axios.get(queryUrl).then(function (res) {
            // console.log(res)
            userEmail = res.data.email
            console.log(userEmail)
            userAvatar = res.data.avatar_url
            console.log(userAvatar)
            console.log(answers.projectName)
            const readme = generateReadMe(answers);

            return writeFileSync("README.md", readme);

        })
        .catch(function (err) {
            console.log(err);
        })
    })
    
