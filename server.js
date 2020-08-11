const mysql = require('mysql2');
const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const consoleTable = require('console.table');
const config = require('./package.json');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '***REMOVED***',
    database: 'employee_tracker',
});

connection.connect((err => {
    if (err) throw err;
}));

console.log(logo({
    name: 'Employee Tracker',
    logoColor: 'green',
    borderColor: 'white'
})
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
        case 'View all departments':
            viewAllDepartments();
            break;
        case 'View all roles':
            viewAllRoles();
            break;
        case 'Add department':
            addDepartment();
            break;
        case 'Add role':
            addRole();
            break;
        case 'Add employee':
            addEmployee();
            break;
        case 'Update employee role':
            updateEmployeeRole();
            break;
        default:
            exitApplication();
    }
};

exitApplication = () => {
    return process.exit();
};

const viewAllEmployees = () => {
    connection.query
        ("SELECT emp.id, emp.first_name, emp.last_name, roles.title, departments.dept_name AS department, roles.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employees AS emp LEFT JOIN employees AS m ON emp.manager_id = m.id INNER JOIN roles ON emp.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id ORDER BY ID ASC;",
            function (err, res) {
                if (err) throw err;

                console.table(res);
                menu();
            }
        );
};

const viewAllDepartments = () => {
    connection.query
        ("SELECT dept_name AS Departments FROM departments;",
            function (err, res) {
                if (err) throw err;

                console.table(res);
                menu();
            }
        );
};

const viewAllRoles = () => {
    connection.query
        ("SELECT title AS Job_Title FROM roles;",
            function (err, res) {
                if (err) throw err;

                console.table(res);
                menu();
            }
        );
};

const addDepartment = async () => {
    const response = await inquirer
        .prompt([
            {
                name: 'newDepartment',
                type: 'input',
                message: 'What is the name of the new department?'
            },
        ]);
    const query = connection.query
        ("INSERT INTO departments SET ?",
        { dept_name: response.newDepartment },
            function (err, res) {
                if (err) throw err;

                viewAllDepartments();
                menu();
            }
        );
};

// const addRole = () => {

// };

// const addEmployee = () => {

// };

// const updateEmployeeRole = () => {

// };

menu();
