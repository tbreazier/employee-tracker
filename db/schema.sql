DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
USE employee_tracker;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE department (
    id INTEGER auto_increment,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INTEGER auto_increment,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id int,
    PRIMARY KEY (id)
    CONSTRAINT fk_departmnet FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employees (
    id INTEGER auto_increment,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id int,
    manager_id INT REFERENCES employee(id),
    PRIMARY KEY (id)
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id)
);
