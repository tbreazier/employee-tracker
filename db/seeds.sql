INSERT INTO departments
VALUES 
    (DEFAULT, 'Human Resources'),
    (DEFAULT, 'IT'),
    (DEFAULT, 'Project Management'),
    (DEFAULT, 'Training and Development'),
    (DEFAULT, 'Finance'),
    (DEFAULT, 'Marketing'),
    (DEFAULT, 'Legal');

INSERT INTO roles
VALUES 
    (DEFAULT, 'Recruiter', 50000, 1),
    (DEFAULT, 'Helpdesk Support', 40000, 2),
    (DEFAULT, 'Software Engineer', 100000, 2),
    (DEFAULT, 'Project Manager', 80000, 3),
    (DEFAULT, 'Leader Trainer', 60000, 4),
    (DEFAULT, 'Accountant', 75000, 5),
    (DEFAULT, 'Chief Financial Officer', 500000, 5),
    (DEFAULT, 'Social Media Analyst', 80000, 6),
    (DEFAULT, 'Lawyer', 90000, 7);

INSERT INTO employees
VALUES
    (DEFAULT, 'Michael', 'Jordan', 7, null),
    (DEFAULT, 'Venus', 'Williams', 6, 7),
    (DEFAULT, 'Patrick', 'Mahomes', 2, 3),
    (DEFAULT, 'Tom', 'Breen', 3, null), 
    (DEFAULT, 'Robin', 'Moore', 8, 9),
    (DEFAULT, 'Kate', 'Mcclane', 9, null),
    (DEFAULT, 'Kevin', 'Costner', 4, 3);
