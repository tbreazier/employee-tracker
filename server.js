//Requires
const mysql = require('mysql2');
const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const consoleTable = require('console.table');

//SQL Connection (PW will need to be entered)
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

//Employee Tracker Logo
console.log(logo({
    name: 'Employee Tracker',
    logoColor: 'green',
    borderColor: 'white'
})
    .render()
);

//Menu Prompt
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
    console.log(logo({
        name: 'Peace Out',
        logoColor: 'pink',
        borderColor: 'green'
    })
        .render()
    );
    return process.exit();
};

//View All Employees Table
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

//View All Departments Table
const viewAllDepartments = () => {
    connection.query
        ("SELECT * FROM departments;",
            function (err, res) {
                if (err) throw err;

                console.table(res);
                menu();
            }
        );
};

//View All Roles Table
const viewAllRoles = () => {
    connection.query
        ("SELECT roles.id, title, salary, dept_name FROM roles LEFT JOIN departments ON roles.department_id = departments.id",
            function (err, res) {
                if (err) throw err;

                console.table(res);
                menu();
            }
        );
};

//Add Department to departments table
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

//Add role to roles table
const addRole = async () => {
    const response = await inquirer
        .prompt([
            {
                name: 'newRole',
                type: 'input',
                message: 'What is the name of the new role?',
            },
            {
                name: 'newRoleSalary',
                type: 'input',
                message: 'What is the salary for the new role?',
            },
        ]);
    const query = connection.query
        ("INSERT INTO roles SET ?",
        { title: response.newRole,
         salary: response.newRoleSalary },
            function (err, res) {
                if (err) throw err;

                menu();
            }
        );
};

//Add Employee to employees table
const addEmployee = async () => {
    const response = await inquirer
        .prompt([
            {
                name: 'newEmployeeFirst',
                type: 'input',
                message: 'What is the employees first name?',
            },
            {
                name: 'newEmployeeLast',
                type: 'input',
                message: 'What is the employees last name?',
            },
        ]);
    const query = connection.query
        ("INSERT INTO employees SET ?",
        { first_name: response.newEmployeeFirst,
         last_name: response.newEmployeeLast },
            function (err, res) {
                if (err) throw err;

                menu();
            }
        );
};

//Coming soon, update employee information
// const updateEmployeeRole = () => {

// };

menu();
