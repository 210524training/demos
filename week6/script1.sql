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
DROP TABLE IF EXISTS phonenumbers;

CREATE TABLE phonenumbers (
	id SERIAL PRIMARY KEY,
	employee_id INTEGER NOT NULL UNIQUE REFERENCES employees (id),
	number VARCHAR(20)
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
