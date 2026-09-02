-- CREATE TABLE Department (
--     dept_id INT PRIMARY KEY,
--     dept_name VARCHAR(100) NOT NULL UNIQUE,
--     location VARCHAR(100) DEFAULT 'Ahmedabad',
--     budget DECIMAL(12,2) CHECK (budget > 0)
-- );

-- INSERT INTO Department
-- (dept_id, dept_name, location, budget)
-- VALUES
-- (1, 'IT', 'Ahmedabad', 1000000),
-- (2, 'HR', 'Ahmedabad', 500000),
-- (3, 'Sales', 'Mumbai', 800000),
-- (4, 'Finance', 'Delhi', 900000),
-- (5, 'Marketing', 'Pune', 600000);


CREATE TABLE Department (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL UNIQUE,
    location VARCHAR(100) DEFAULT 'Ahmedabad',
    budget DECIMAL(12,2) CHECK (budget > 0)
);

CREATE TABLE Employee (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(100) NOT NULL,
    salary DECIMAL(10,2) CHECK (salary > 0),
    dept_id INT,
    hire_date DATE DEFAULT CURRENT_DATE,
    email VARCHAR(150) UNIQUE,

    FOREIGN KEY (dept_id)
        REFERENCES Department(dept_id)
);

INSERT INTO Department
(dept_id, dept_name, location, budget)
VALUES
(1, 'IT', 'Ahmedabad', 1000000),
(2, 'HR', 'Ahmedabad', 500000),
(3, 'Sales', 'Mumbai', 800000),
(4, 'Finance', 'Delhi', 900000),
(5, 'Marketing', 'Pune', 600000);


INSERT INTO Employee
(emp_id, emp_name, salary, dept_id, hire_date, email)
VALUES
(1, 'Aman', 60000, 1, '2025-01-10', 'aman@gmail.com'),
(2, 'Rahul', 70000, 1, '2025-02-15', 'rahul@gmail.com'),
(3, 'Priya', 55000, 1, '2025-03-20', 'priya@gmail.com'),

(4, 'Neha', 50000, 2, '2025-04-10', 'neha@gmail.com'),
(5, 'Karan', 55000, 2, '2025-05-12', 'karan@gmail.com'),

(6, 'Riya', 45000, 3, '2025-06-01', 'riya@gmail.com'),
(7, 'Vivek', 52000, 3, '2025-06-15', 'vivek@gmail.com'),
(8, 'Jay', 40000, 3, '2025-07-10', 'jay@gmail.com'),

(9, 'Mehul', 65000, 4, '2025-08-01', 'mehul@gmail.com'),
(10, 'Pooja', 58000, 4, '2025-08-15', 'pooja@gmail.com'),

(11, 'Nisha', 42000, NULL, '2025-09-01', 'nisha@gmail.com'),
(12, 'Dev', 75000, 1, '2025-09-15', 'dev@gmail.com');




UPDATE Employee
SET salary = salary * 1.10
WHERE dept_id IN (
    SELECT dept_id
    FROM Department
    WHERE dept_name = 'IT'
);


UPDATE Employee
SET salary = salary * 1.10
WHERE dept_id = (
    SELECT dept_id
    FROM Department
    WHERE dept_name = 'IT'
);


SELECT *
FROM Employee
ORDER BY salary DESC, emp_id ASC;




SELECT
    dept_id,
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary
FROM Employee
GROUP BY dept_id;







SELECT
    dept_id,
    COUNT(*) AS employee_count
FROM Employee
GROUP BY dept_id
HAVING COUNT(*) > 1;








SELECT
    dept_id,
    MAX(salary) AS highest_salary,
    MIN(salary) AS lowest_salary,
    COUNT(*) AS employee_count
FROM Employee
GROUP BY dept_id;



SELECT *
FROM Employee
ORDER BY salary DESC
LIMIT 3;


ORDER BY salary DESC
LIMIT 3;







SELECT
    e.emp_name,
    d.dept_name,
    e.salary
FROM Employee e
INNER JOIN Department d
    ON e.dept_id = d.dept_id;









SELECT
    e.emp_name,
    d.dept_name
FROM Employee e
LEFT JOIN Department d
    ON e.dept_id = d.dept_id;


SELECT
    d.dept_name,
    e.emp_name
FROM Employee e
RIGHT JOIN Department d
    ON e.dept_id = d.dept_id;

SELECT
    e.emp_name,
    d.dept_name,
    e.salary
FROM Employee e
FULL OUTER JOIN Department d
    ON e.dept_id = d.dept_id;













	SELECT
    e.emp_name,
    d.dept_name,
    e.salary
FROM Employee e
LEFT JOIN Department d
    ON e.dept_id = d.dept_id

UNION

SELECT
    e.emp_name,
    d.dept_name,
    e.salary
FROM Employee e
RIGHT JOIN Department d
    ON e.dept_id = d.dept_id;















	SELECT
    d.dept_id,
    d.dept_name
FROM Department d
WHERE EXISTS (
    SELECT 1
    FROM Employee e
    WHERE e.dept_id = d.dept_id
      AND e.salary > 50000
);








SELECT *
FROM Employee
WHERE salary > ALL (
    SELECT e.salary
    FROM Employee e
    JOIN Department d
        ON e.dept_id = d.dept_id
    WHERE d.dept_name = 'HR'
);

