const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const allFunction = require('./utils/all.js');
const departmentFunction = require('./utils/department.js');


const menu = async() => {
    // console.log(logo({ 
    //   name: 'Employee Tracker', 
    //   logoColor: 'green', 
    //   borderColor: 'white'})
    //   .render()
    // );

    console.log('Welcome to the employee tracker!');

    await inquirer.prompt({
        name: 'initial',
        type: 'list', 
        message: 'What would you like to do?',
        choices: [
            'View all employees',
            'View all departments',
            'View all roles',
            'Add department',
            'Add role',
            'Add employee',
            'Update employee role',
            'Exit application',
        ],
    })
    .then((answer) => {
        switch (answer.action) {
            case 'View all employees':
                allFunction.displayAll(menu);
                break;
            
            case 'View all departments':
                departmentFunction.displayAllDepart(menu);
                break;
        }
    })
}
menu();

