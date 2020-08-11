const mysql = require('mysql2');
const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const consoleTable = require('console.table');
const config = require('./package.json');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_tracker',
});

connection.connect((err => {
    if (err) throw err;
}));

console.log(logo({ 
    name: 'Employee Tracker', 
    logoColor: 'green', 
    borderColor: 'white'})
    .render()
);

const menu = async () => {
    const response = await inquirer
        .prompt([
        {
        name: 'action',
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
        },   
    ]);
    switch (response.action) {
        case 'View all employees':
            viewAllEmployees();
            break;
    }        
};

const viewAllEmployees = () => {
    connection.query
    ("SELECT * FROM employees;",
        function (err, res){
        if (err) throw err;
        
        console.table(res);
        menu();
        }
    );
};

const viewAllDepartments = () => {

};

const viewAllRoles = () => {

};

const addDepartment = () => {

};

const addRole = () => {

};

menu();

