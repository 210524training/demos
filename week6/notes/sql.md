# SQL
SQL is "Structured Query Language"

SQL is NOT a programming language. It is a language that allows us to specify what sort of operations we want to perform against a **relational database**.

Relational database: a database that is structured in the form of tables that could be potentially related to each other with foreign keys and primary keys
- Rows are individual "entries"
- Columns are properties for each entry

A database is a collection of data in an organized format
- Allows us to input, manage, and retrieve data quickly
- Data in a relational database is the intersection between rows and columns (cell)

RDBMS = Relational DataBase Management System
- A system that upholds specified relationships between tables
- Includes functionality that maintains the security, accuracy, integrity, and consistency of the data

# SQL Dialects
- PostgreSQL
- OracleSQL
- MySQL
- Microsoft SQL Server
- SQLite
- MariaDB

Each of these is a specific implementation of SQL
- They all follow the same SQL standard, so in general they have many similarities
- It shouldn't be too hard to transition from one dialect to another

# SQL Sublanguages
- DDL = Data Definition Language
    - For creation/alteration of table structure
    - CREATE, ALTER, TRUNCATE (removes ALL data from within a table, but keep the table), DROP (delete table)
- DML = Data Manipulation Language
    - For changing/manipulating/modifying data within a table
    - deals with CRUD operations (Create, Read, Update, Delete)
    - INSERT, SELECT, UPDATE, DELETE
- DQL = Data Query Language
    - has to do with reading the data
    - SELECT
    - some people consider this to not be a real sublanguage, but rather falls under DML
- DCL = Data Control Language
    - regulates access to data by imposing restrictions such as user permissions
    - pertains to security
    - GRANT, REVOKE
- TCL = Transaction Control Language
    - Pertains to work on the database, and finalizing or reverting changes
    - COMMIT, ROLLBACK, SAVEPOINT, SET TRANSACTION (used to set isolation levels)

# Constraints
Constraints are rules (or conditions) that must be followed to enforce database table relationships

1. Primary Key
    - Data in this column unique and not null
    - Acts as the unique identifier for records in the table
    - All tables in SQL should have a primary key
    - **Composite Key**: are just primary keys that consist of multiple columns together
2. Foreign Key
    - Foreign keys help to establish relationships between 2 tables
    - Data in this column is used as a reference to the primary key in another table
    - We often use JOIN operations and specify a foreign key and primary match in order to fetch data from both sides of the relationship
        - A JOIN operation across a foreign key relationship within the same table is called a "self join"
3. Unique
    - Data in this column may not have duplicates
    - But, we can still have multiple null values
4. Not Null
    - This enforces that the data in the column is not empty (null)
5. Default
    - Provides a default value if we did not provide a value
    - Generally this is in the case of inserting a new record
6. Check
    - Adds an extra condition that must be enforced
    - For example, enforcing that all records in the "Person" table have an age >= 18

## Composite Keys
Most of the time, the primary key will consist of a single column. Sometimes, however, multiple columns may be used together to create a primary key to uniquely identify a row. Each column that makes up this primary key, is known as a candidate key. This forms a primary key with multiple columns that is known as a composite key. In the example of a CD collection, we may have a table called `song` that has the columns `track_no`, `album_id`, `genre`, etc. Notice that `track_no` by itself would not work as a primary key, because we will have multiple albums with the same track numbers (1st song is track_no 1 for example, in each album). In this case, we would have a composite key made up of the **candidate keys**, album_id and track_no to uniquely identify a song.

## Referential Integrity
Whenever we create relationships between tables, such as by having a foreign key in one table link to the primary key in another table, we want to make sure that integrity is upheld between the two tables. What this means is we should always have a foreign key that points to a priamry key value that actually exists. So, if you try to delete a record in one table that the foreign key in another table depends on, SQL will not allow you to do so without doing some sort of "cascade" operation. This is to prevent "orphan" records from occurring.
- Example: if you try to delete a ship that contains many pirates, you need to delete the pirates first before deleting the ship

# Cardinality / Multiplicity
Describes the numerical relationship between 2 tables. There are 3 categories:
- 1 to 1
    - Records in one table are associated with only 1 record in another table
    - Can be created by using the UNIQUE constraint on a foreign key column
    - For a 1 to 1 relationship, it doesn't matter which side your foreign key is on, it could be on either side
- 1 to many (or many to 1)
    - Individual records in one table are associated with many records in the other
    - Ex: One ship has many pirates (or many pirates belong to one ship)
    - Accomplished with using a non-unique foreign key
    - The foreign key must be on the many side of the relationship
- many to many
    - Records in both tables are associated with many records in the other
    - Ex: Students and Courses or Students and Professors
    - We construct this relationship using a THIRD table known as a join table

Join tables are a separate independent table that consists of 2 columns, both of which are foreign keys that point back to the original source tables. Both columns will be non-unique foreign keys, to structure this table as 2 many to one relationships back to back.

| Table1 PK |
| :-------- |
| 1 |
| 2 |
| 3 |
| 4 |

| Table2 PK |
| :-------- |
| 100 |
| 200 |
| 300 |
| 400 |

| Join Table FK1 | Join Table FK2 |
| :------------- | :------------- |
| 1 | 100 |
| 1 | 200 |
| 1 | 300 |
| 2 | 300 |
| 3 | 100 |
| 3 | 400 |
| 4 | 100 |
| 4 | 200 |
| 4 | 300 |
| 4 | 400 |

# Database Normalization
Normalization is how we aim to reduce redundancy and duplicate data when designing databases. It aims to help keep a database organized and maintainable.

Levels of normalization:
- 0NF = Zero normal form
    - Not really a level
    - No normalization at all
    - Chaos in our database
- 1NF = 1st normal form
    - Data should be atomic (if you have a phone number column, and put two phone numbers separated by a comma, that IS NOT atomic (don't do "111-111-1111, 222-222-2222"))
        - Instead you should have a many to one relationship between a phonenumber table and the other table that contains the person owning those phone numbers
    - Table must have a primary key
- 2NF = 1st NF + No partial dependencies
    - Cannot have columns that are dependent on only one part of the composite key
        - If you have no composite key, and are already in 1NF, then we are already in 2NF
- 3NF = 2nd NF + no transitive dependencies
    - If you have a column C describing another column B, which then describes the PK, we are not in 3NF because C is only indirectly related to the primary key
    - Your colummns should describe the primary key and the primary key only

General Guidelines:
- 1NF: We must have a key
- 2NF: We must describe the whole key (composite key)
- 3NF: We should describe nothing but the key

# Transaction Properties: ACID

- Atomicity: means that transactions will execute successfully or not at all. We are treating DML operations as part of a single transaction that either completely succeeds (and gets committed) or fails (and gets rolled back).
- Consistency: constraints are enforced for every operation. We cannot commit changes if they do not follow constraints set for the database. Primary key, foreign key, data types, checks, not null, unique, referential integrity, etc. need to all be upheld.
- Isolation: If we have multiple transactions happening at the same time, the principle of isolation is talking about how we should deal with these concurrent transactions. So if we have two transactions occurring, one transaction should ideally not be disturbing the other. We have many different isolation levels that allow different levels in which interference could occur.
- Durability: When a transaction is complete (has been committed), it is persisted to the database within permanent memory (such as a hard drive instead of RAM). So even if our system lost power, etc. the changes would still be there upon reboot.

# Read Phenomena
[Link to Wikipedia Article](https://en.wikipedia.org/wiki/Isolation_(database_systems)#Read_phenomena)

This is related to the I (isolation) in ACID properties. Read phenomena refer to the degree in which two transactions will interfere with each other when doing some sort of modifications and reads on the same data.
- When applications becomes more complex and more traffic and modifications happen concurrently, we need to account for these issues
- The more strict our isolation level, the more careful the system is about avoiding conflicts, but this could cause performance issues since concurrency would decrease with a more strict level

| Isolation Level | Dirty Read | Non-repeatable Read | Phantom Read |
| :-------------- | :--------- | :------------------ | :----------- |
| Read Uncommitted | Y | Y | Y |
| Read Committed | N | Y | Y |
| Repeatable Read | N | N | Y |
| Serializable | N | N | N |

# Database Joins
- Joins are operations to "join" together data that we are querying for
- Useful when retrieving data where there is a relationship between tables
- Several Types
    - INNER JOIN
        - Shows records where the condition matches both sides
    - FULL OUTER JOIN
        - Shows matching records and records that don't have a match, with NULL values on the opposite side for nonmatching cases
    - LEFT/RIGHT JOIN
        - Data from the LEFT (or RIGHT) table are paired with another table, with NULLs if no match is found for the other side
    - CROSS JOIN
        - Cross product of both tables
        - List of permutations
            - A lot of data!
            - Table w/ 1000 records, and another table w/ 2000
                - 2,000,000 results (1000 * 2000)
    - SELF JOIN
        - Not really a type of join, but describes joining a foreign key to a primary key ON the same table