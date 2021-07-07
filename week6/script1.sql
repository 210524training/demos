-- This is a single line comment
-- This is where you actually type the SQL that you will eventually want to execute

/*

This is a multi-line comment
I can keep adding more lines

*/

DROP TABLE IF EXISTS employees CASCADE;

CREATE TABLE employees (
	-- inside of the parentheses here, we specify our columns along with the datatype and any constraints 
	-- column_name DATATYPE CONSTRAINTS
	id SERIAL PRIMARY KEY,
	-- the SERIAL datatype is a special datatype in postgres specifically (it may be different for other dialects)
	-- that provides auto-incrementing ability for our primary keys
	-- This means when we insert a new record, we can ignore inserting a value for the primary key, which will be automatically generated
	-- for us
	-- Other than that, it is essentially the same as the INTEGER datatype
	first_name VARCHAR(255) NOT NULL CHECK (LENGTH(first_name) > 0),
	last_name VARCHAR(255) NOT NULL CHECK (LENGTH(last_name) > 0),
	email VARCHAR(255) NOT NULL UNIQUE CHECK(LENGTH(email) > 0),
	age INTEGER NOT NULL DEFAULT 0 CHECK (age >= 0),
	supervisor INTEGER
);

ALTER TABLE employees
	ADD CONSTRAINT users_supervisor_fk
	FOREIGN KEY (supervisor) REFERENCES employees (id);


-- Create phonenumbers table
DROP TABLE IF EXISTS phonenumbers CASCADE;

CREATE TABLE phonenumbers (
	id SERIAL PRIMARY KEY,
	employee_id INTEGER NOT NULL UNIQUE REFERENCES employees (id),
	number VARCHAR(20)
);

DROP TABLE IF EXISTS accounts CASCADE;

CREATE TABLE accounts (
	id SERIAL PRIMARY KEY,
	owner_id INTEGER NOT NULL REFERENCES employees (id),
	balance NUMERIC (40, 2) NOT NULL DEFAULT 0
);

-- Inserting some data
INSERT INTO employees (first_name, last_name, email, age)
VALUES
('John', 'Doe', 'john_doe@email.com', 30),
('Bach', 'Tran', 'bachtran@email.com', 23);

INSERT INTO employees (first_name, last_name, email, age, supervisor)
VALUES 
('Billy', 'Bob', 'billybob@email.com', 25, 1),
('Jane', 'Doe', 'janedoe@email.com', 28, 1);

-- querying data
SELECT * FROM employees;

SELECT first_name, last_name FROM employees;

-- You can construct custom columns during the process of querying
-- || is used to perform string concatenation
-- Can use the AS keyword as an alias

SELECT first_name || ' ' || last_name AS full_name FROM employees;

INSERT INTO accounts (owner_id) VALUES (1);

INSERT INTO accounts (owner_id, balance) VALUES (2, 1000),
(2, 1500);

-- JOINs
-- We can use JOINS to combine results from two different tables based on a certain match
-- So typically, you'll match the primary key of one table with the foreign key of another

SELECT e.first_name, e.last_name, a.balance
FROM employees e
LEFT JOIN accounts a
ON e.id = a.owner_id;

SELECT e.first_name || ' ' || e.last_name AS full_name, a.balance
FROM employees e
LEFT JOIN accounts a
ON e.id = a.owner_id;

SELECT e2.*
FROM employees e1
INNER JOIN employees e2
ON e1.id = e2.supervisor
WHERE e2.supervisor = 1
ORDER BY first_name DESC;

-- Subqueries
-- You can nest SELECT statements by creating subqueries
-- Select all employees whose bank account balance is higher than the average balance of
-- all employees

SELECT AVG(balance)
FROM accounts;

SELECT *
FROM employees e
INNER JOIN accounts a
ON e.id = a.owner_id
WHERE a.balance > (SELECT AVG(balance) FROM accounts)


-- You can also use the SELECT statement on a "fake table" that is created from a subquery
SELECT sub1.full_name, LENGTH(sub1.full_name) FROM (
	SELECT first_name || ' ' || last_name AS full_name
	FROM employees
) AS sub1

-- Clauses we can use with select statements:
-- WHERE
-- GROUP BY
-- HAVING 
-- LIMIT 
-- ORDER BY 

-- WHERE v. HAVING 
-- The difference between WHERE is HAVING is that WHERE applies the filter before data 
-- is grouped using GROUP BY 
-- HAVING applies the filter AFTER the data has already been grouped 

/*
 * Set Operations
 */
DROP TABLE IF EXISTS one CASCADE;
DROP TABLE IF EXISTS two CASCADE;

CREATE TABLE one (
	one INTEGER PRIMARY KEY,
	two INTEGER
);

CREATE TABLE two (
	one INTEGER PRIMARY KEY,
	two INTEGER
);

INSERT INTO one VALUES (1, 1), (2, 2);
INSERT INTO two VALUES (1, 1), (2, 1);

-- Set operations only operate on results that have the same number and type of columns
SELECT *
FROM one;

SELECT *
FROM two;

-- UNION operator will combine all results together, but NOT contain duplicates
SELECT *
FROM one 
UNION 
SELECT *
FROM two

-- UNION ALL does include duplicates
SELECT *
FROM one 
UNION ALL 
SELECT *
FROM two

-- INTERSECT will include only rows that are the same as each other
SELECT *
FROM one 
INTERSECT 
SELECT *
FROM two

-- EXCEPT will keep results from the left resultset and remove any matching results
-- that came from the right
-- It's basically like subtraction where you remove from the left table what matches
-- in the right side
SELECT * 
FROM one 
EXCEPT 
SELECT *
FROM two

/*
 * Scalar and aggregate functions
 * 
 * Scalar functions are functions that operate on only a single input
 * and produce 1 output for each input
 * ex: LENGTH, LOWER, TRIM, SIN, COS, TAN
 * 
 * Aggregate functions are functions that take an entire column as input
 * and produce 1 output for all of the data in that column
 * ex: SUM, AVG, etc.
 * 
 * the GROUP BY clause in SELECT statements is used in conjunction w/ aggregate functions
 * in order to provide the ability to segregate data into groups that the aggregate function
 * can then act independently on for each group.
 */

/*
 * DCL (Data Control Language)
 */

CREATE SCHEMA mynewschema;
CREATE USER btran WITH PASSWORD '12345';

-- Using GRANT to give privileges to user btran
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA mynewschema TO btran;

-- Indexes help us to optimize querying for data in a table w/ many records
CREATE TABLE test1 (
    id integer,
    content varchar
);

CREATE INDEX test1_id_index ON test1 (id); -- This helps us to optimize finding a record
-- by its ID
-- by default CREATE INDEX uses what's known as a B tree for helping w/ fast retrieval
-- Postgres supports these types of indexes: B-tree, Hash, GiST and GIN

SELECT *
FROM test1
WHERE id = 100000;