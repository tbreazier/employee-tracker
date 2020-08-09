const inquirer = require('inquirer');
const logo = require('asciiart-logo');

const menu = async() => {
    console.log(logo({ 
      name: 'Employee Tracker', 
      logoColor: 'green', 
      borderColor: 'white'})
      .render()
      );

    await inquirer .prompt({
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
}
 menu();

