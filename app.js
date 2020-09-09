const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function promptUser(){
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Welcome valued employee! Please enter your name."
        },
        {
            type: "input",
            name: "id",
            message: "What is your employee id number?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address?"
        },
        {
            type: "list",
            name: "role",
            message: "Welcome! What is your role?",
            choices: ["Engineer", "Manager", "Intern"]
        }
    ])

    .then(function(response){
        var role = response.role; 
        var name = response.name;
        var userId = response.id;
        var email = response.email;

        switch (role) {
            case "Engineer":
                console.log("you're an engineer");
                inquirer.prompt([
                    {
                        type: "input",
                        name: "github",
                        message: "What is your github username?"
                    }
                ])
                .then(function(engineerRes){
                     const newEngineer = new Engineer(name, userId, email, engineerRes.github)
                     console.log(newEngineer);
                })
                break;
            case "Manager":
                console.log("you're a manager");
                inquirer.prompt([
                    {
                        type: "input",
                        name: "officeNumber",
                        message: "What is your office number?"
                    }
                ])
                .then(function(managerRes){
                    const newManager = new Manager(name, userId, email, managerRes.officeNumber)
                    console.log(newManager);
                })
                break;
            case "Intern":
                console.log("you're an intern");
                inquirer.prompt([
                    {
                        type: "input",
                        name: "school",
                        message: "What is the name of your school?"
                    }
                ])
                .then(function(internRes){
                    const newIntern = new Intern(name, userId, email, internRes.school);
                    console.log(newIntern);
                })
                break;
        }
    })
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

promptUser();